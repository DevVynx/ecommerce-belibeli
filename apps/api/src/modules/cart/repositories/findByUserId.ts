import { db } from "@/shared/lib/db";

type findCartByUserIdProps = {
  userId: string;
};

export const findCartByUserId = async ({ userId }: findCartByUserIdProps) => {
  const now = new Date();

  const cart = await db.cart.findUnique({
    where: { userId },
    include: {
      items: {
        omit: {
          createdAt: true,
          updatedAt: true,
        },
        include: {
          productVariant: {
            omit: {
              createdAt: true,
              updatedAt: true,
            },
            include: {
              promotions: {
                where: {
                  isActive: true,
                  startsAt: { lte: now },
                  endsAt: { gte: now },
                },
              },
              product: {
                omit: {
                  createdAt: true,
                  updatedAt: true,
                  totalStock: true,
                },
                include: {
                  category: {
                    select: {
                      id: true,
                      name: true,
                      promotions: {
                        where: {
                          isActive: true,
                          startsAt: { lte: now },
                          endsAt: { gte: now },
                        },
                      },
                    },
                  },
                  promotions: {
                    where: {
                      isActive: true,
                      startsAt: { lte: now },
                      endsAt: { gte: now },
                    },
                  },
                },
              },
              optionValues: {
                include: {
                  productOptionValue: {
                    include: {
                      productOption: true,
                    },
                  },
                },
              },
              images: { select: { url: true } },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    omit: { userId: true, createdAt: true, updatedAt: true },
  });

  return cart;
};
