import { ShoppingCartIcon, CategoryIcon, HomeIcon, ProfileIcon } from "@/assets/Icons";

export const bottomNavItems = [
  {
    label: "Home",
    href: "/",
    icon: (isActive: boolean) => (
      <HomeIcon className={`size-7 ${isActive ? "fill-current" : "fill-none stroke-current"}`} />
    ),
  },
  {
    label: "Categorias",
    href: "#categoriesSection",
    icon: (isActive: boolean) => (
      <CategoryIcon
        className={`size-7 ${isActive ? "fill-current" : "fill-none stroke-current"}`}
      />
    ),
  },
  {
    label: "Carrinho",
    href: "/cart",
    icon: (isActive: boolean) => (
      <ShoppingCartIcon
        className={`size-7 ${isActive ? "fill-current" : "fill-none stroke-current"}`}
      />
    ),
  },
  {
    label: "Perfil",
    href: "/profile",
    icon: (isActive: boolean) => (
      <ProfileIcon className={`size-7 ${isActive ? "fill-current" : "fill-none stroke-current"}`} />
    ),
  },
];
