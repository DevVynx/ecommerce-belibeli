# -------- BUILD STAGE --------
FROM node:24-alpine AS builder

# set up pnpm via corepack (determinístico)
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate

WORKDIR /belibeli

# copy only manifests first to leverage cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api/package.json apps/api/
COPY --parents packages/*/package.json ./

# install workspace deps (hoisted) — frozen lockfile ensures reproducible install
RUN pnpm install --frozen-lockfile

# copy source
COPY . .

# build only the api (turbo will only run what's necessary)
RUN pnpm turbo run build --filter=api

# -------- PRODUCTION STAGE --------
FROM node:24-alpine AS prod

# minimal runtime deps
RUN apk add --no-cache tzdata

WORKDIR /belibeli

# create non-root user (security)
RUN addgroup -S app && adduser -S app -G app
USER app

# copy build artifact from builder
# assume build outputs to apps/api/dist
COPY --from=builder --chown=app:app /belibeli/apps/api/dist ./dist
# also copy the api package.json so npm/pnpm can install prod deps if needed
COPY --from=builder /belibeli/apps/api/package.json ./package.json
# copy lockfile so installs are reproducible if you need to install in this stage
COPY --from=builder /belibeli/pnpm-lock.yaml ./pnpm-lock.yaml

# Set NODE_ENV (helps libs pick production mode)
ENV NODE_ENV=production

# Install only production deps (if your build process didn't bundle them)
# Trade-off: this performs a network install at image build time, but keeps runtime minimal.
RUN corepack enable && corepack prepare pnpm@10.14.0 --activate && \
    pnpm install --frozen-lockfile --prod

# Expose and start
EXPOSE 3000
CMD ["node", "dist/main.js"]
