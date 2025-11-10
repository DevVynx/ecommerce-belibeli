import { HeartIcon, HomeIcon, ShoppingCartIcon, UserIcon } from "lucide-react";

export const bottomNavItems = [
  {
    label: "Home",
    href: "/",
    icon: (isActive: boolean) => (
      <HomeIcon className={`size-7 ${isActive ? "fill-black" : "fill-none stroke-current"}`} />
    ),
  },
  {
    label: "Carrinho",
    href: "/cart",
    icon: (isActive: boolean) => (
      <ShoppingCartIcon
        className={`size-7 ${isActive ? "fill-black" : "fill-none stroke-current"}`}
      />
    ),
  },
  {
    label: "Desejos",
    href: "/wishlist",
    icon: (isActive: boolean) => (
      <HeartIcon className={`size-7 ${isActive ? "fill-black" : "fill-none stroke-current"}`} />
    ),
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: (isActive: boolean) => (
      <UserIcon className={`size-7 ${isActive ? "fill-black" : "fill-none stroke-current"}`} />
    ),
  },
];
