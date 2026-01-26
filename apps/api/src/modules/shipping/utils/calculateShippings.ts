import { SHIPPING_ORIGIN_CEP } from "@/shared/utils/env";

type CalculateShippingInput = {
  destinyCep: string; // "00000000"
  weight: number; // em kg
  price: number; // price do pedido
};

type ShippingOption = {
  service: string;
  price: number;
  deadline: {
    min: number;
    max: number;
  };
};

export const calculateShippings = ({
  destinyCep,
  weight,
  price,
}: CalculateShippingInput): ShippingOption[] => {
  // CEP de origem fixo (ex: CD em SP capital)
  const cepOrigem = SHIPPING_ORIGIN_CEP;

  const getRegionByCep = (cep: string) => {
    const prefix = Number(cep.slice(0, 2));

    if (prefix >= 10 && prefix <= 19) return "SP";
    if (prefix >= 20 && prefix <= 28) return "RJ";
    if (prefix >= 30 && prefix <= 39) return "MG";
    if (prefix >= 40 && prefix <= 49) return "BA";
    if (prefix >= 50 && prefix <= 59) return "NE";
    if (prefix >= 60 && prefix <= 69) return "N";
    if (prefix >= 70 && prefix <= 72) return "DF";
    if (prefix >= 80 && prefix <= 87) return "PR";
    if (prefix >= 90 && prefix <= 99) return "RS";

    return "OUTROS";
  };

  const origemRegion = getRegionByCep(cepOrigem);
  const destinoRegion = getRegionByCep(destinyCep);

  const getDistanceFactor = () => {
    if (origemRegion === destinoRegion) return "LOCAL";
    if (["SP", "RJ", "MG"].includes(origemRegion) && ["SP", "RJ", "MG"].includes(destinoRegion))
      return "REGIONAL";
    return "NACIONAL";
  };

  const distanceFactor = getDistanceFactor();

  // Base de prazo por distância
  const deadlineByDistance = {
    LOCAL: { min: 1, max: 3 },
    REGIONAL: { min: 3, max: 5 },
    NACIONAL: { min: 6, max: 10 },
  };

  // Base de preço
  const basePriceByDistance = {
    LOCAL: 15,
    REGIONAL: 25,
    NACIONAL: 40,
  };

  const priceByWeight = weight * 4; // regra simples
  const insurance = price * 0.01; // 1% do price do pedido

  const baseDeadline = deadlineByDistance[distanceFactor];
  const basePrice = basePriceByDistance[distanceFactor];

  return [
    {
      service: "PAC",
      price: Number((basePrice + priceByWeight + insurance).toFixed(2)),
      deadline: {
        min: baseDeadline.min,
        max: baseDeadline.max,
      },
    },
    {
      service: "SEDEX",
      price: Number((basePrice * 1.6 + priceByWeight * 1.2 + insurance).toFixed(2)),
      deadline: {
        min: Math.max(1, baseDeadline.min - 1),
        max: Math.max(2, baseDeadline.max - 2),
      },
    },
  ];
};
