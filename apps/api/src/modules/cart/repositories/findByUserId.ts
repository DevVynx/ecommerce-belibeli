import { db } from "@/shared/lib/db";

export const findCartByUserId = async (userId: string) => {
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
              productVariantOptions: {
                include: {
                  productOptionValue: {
                    include: {
                      productOption: true,
                    },
                  },
                },
              },
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
