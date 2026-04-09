import {
  HandbagIcon,
  HeartIcon,
  PackageSearch,
  ShoppingCartIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";

export const sideMenuStoreActionIcons = [
  {
    icon: <PackageSearch className="size-7" />,
    label: "Categorias",
    link: "#categoriesSection",
  },
  {
    icon: <ZapIcon className="size-7 stroke-red-500" />,
    className: "text-red-500",
    label: "Ofertas Relâmpago",
    link: "#flashSaleSection",
  },
];

export const sideMenuPersonalActionIcons = [
  {
    icon: <UserIcon className="size-7" />,
    label: "Meu Perfil",
    link: "/account",
  },
  {
    icon: <HandbagIcon className="size-7" />,
    label: "Seus Pedidos",
    link: "/account/orders",
  },
  {
    icon: <HeartIcon className="size-7" />,
    label: "Lista de Desejos",
    link: "/wishlist",
  },
  {
    icon: <ShoppingCartIcon className="size-7" />,
    label: "Seu Carrinho",
    link: "/cart",
  },
];
