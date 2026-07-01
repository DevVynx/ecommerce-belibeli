import { db } from "@/shared/lib/db";

type DeleteUserProps = {
  userId: string;
};

export const deleteUser = async ({ userId }: DeleteUserProps) => {
  await db.$transaction([
    db.address.deleteMany({ where: { userId } }),
    db.refreshToken.deleteMany({ where: { userId } }),
    db.cartItem.deleteMany({ where: { cart: { userId } } }),
    db.cart.deleteMany({ where: { userId } }),
    db.wishlistItem.deleteMany({ where: { wishlist: { userId } } }),
    db.wishlist.deleteMany({ where: { userId } }),
    db.couponUsage.deleteMany({ where: { userId } }),
    db.user.delete({ where: { id: userId } }),
  ]);
};
