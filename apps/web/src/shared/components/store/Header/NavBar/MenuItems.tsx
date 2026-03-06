import {
  CreditCardIcon,
  File,
  FileBoxIcon,
  FileQuestionMarkIcon,
  HandbagIcon,
  HeartIcon,
  MenuIcon,
  PhoneIcon,
  ShoppingCartIcon,
  SparklesIcon,
  TagIcon,
  UserIcon,
  ZapIcon,
} from "lucide-react";

export const headerActionIcons = [
  {
    icon: <HeartIcon className="size-7 cursor-pointer stroke-2" />,
    key: "Heart",
    link: "/wishlist",
  },
  {
    icon: <ShoppingCartIcon className="size-7 cursor-pointer stroke-2" />,
    key: "Cart",

    link: "/cart",
  },
  {
    icon: <MenuIcon className="size-7 cursor-pointer" />,
    key: "Menu",
    className: "flex lg:hidden",
  },
  {
    icon: <UserIcon className="size-7 cursor-pointer stroke-2" />,
    key: "Profile",
    className: "hidden lg:flex",
    link: "/profile",
  },
];

export const sideMenuMainLinks = [
  {
    icon: <UserIcon className="size-7" />,
    label: "Meu Perfil",
  },
  {
    icon: <HandbagIcon className="size-7 fill-none stroke-black" />,
    label: "Seus Pedidos",
  },
  {
    icon: <HeartIcon className="size-7" />,
    label: "Lista de Desejos",
  },
  {
    icon: <ShoppingCartIcon className="size-7" />,
    label: "Seu Carrinho",
  },
  {
    icon: <TagIcon className="size-7 fill-none stroke-black" />,
    label: "Categorias",
    link: "#categoriesSection",
  },
  {
    icon: <SparklesIcon className="size-7 fill-none stroke-black" />,
    label: "Ofertas",
  },
  {
    icon: <ZapIcon className="size-7 fill-none stroke-red-500" />,
    className: "text-red-500",
    label: "Ofertas Relâmpago",
    link: "#flashSaleSection",
  },
];

export const sideMenuSupportLinks = [
  {
    icon: <PhoneIcon className="size-7" />,
    label: "Fale Conosco",
  },
  {
    icon: <CreditCardIcon className="size-7" />,
    label: "Métodos de Pagamento",
  },
  {
    icon: <FileBoxIcon className="size-7" />,
    label: "Política de Troca",
  },
  {
    icon: <FileQuestionMarkIcon className="size-7" />,
    label: "Ajuda e FAQ",
  },
  {
    icon: <File className="size-7" />,
    label: "Termos de Uso",
  },
];
