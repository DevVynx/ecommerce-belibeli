import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

import { generateSlug } from "@/modules/product/helpers/generateSlug";
import { ENV } from "@/shared/utils/env";

import { PrismaClient } from "../prisma/generated/client/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ProductSeedResult = {
  products: number;
  variants: number;
  images: number;
};

// ── Category mapping ──
const CATEGORY_MAP: Record<string, string> = {
  beauty: "Beleza",
  fragrances: "Perfumes",
  furniture: "Casa & Decoração",
  groceries: "Alimentos",
  "home-decoration": "Casa & Decoração",
  "kitchen-accessories": "Cozinha",
  laptops: "Eletrônicos",
  "mens-shirts": "Masculino",
  "mens-shoes": "Masculino",
  "mens-watches": "Acessórios",
  "mobile-accessories": "Eletrônicos",
  motorcycle: "Veículos",
  "skin-care": "Beleza",
  smartphones: "Eletrônicos",
  "sports-accessories": "Esportes",
  sunglasses: "Acessórios",
  tablets: "Eletrônicos",
  tops: "Feminino",
  vehicle: "Veículos",
  "womens-bags": "Feminino",
  "womens-dresses": "Feminino",
};

const CATEGORY_PREFIX: Record<string, string> = {
  "mens-shoes": "Tênis",
  "mens-shirts": "Camisa",
  "womens-dresses": "Vestido",
  tops: "Vestido",
  "womens-bags": "Bolsa",
  "mens-watches": "Relógio",
  sunglasses: "Óculos",
  laptops: "Notebook",
  smartphones: "Smartphone",
  tablets: "Tablet",
  motorcycle: "Moto",
  vehicle: "Veículo",
};

const TERM_DICT: [RegExp, string][] = [
  [/\bRed\b/gi, "Vermelho"],
  [/\bBlack\b/gi, "Preto"],
  [/\bBlue\b/gi, "Azul"],
  [/\bWhite\b/gi, "Branco"],
  [/\bGreen\b/gi, "Verde"],
  [/\bPink\b/gi, "Rosa"],
  [/\bPurple\b/gi, "Roxo"],
  [/\bYellow\b/gi, "Amarelo"],
  [/\bGray\b/gi, "Cinza"],
  [/\bGrey\b/gi, "Cinza"],
  [/\bBrown\b/gi, "Marrom"],
  [/\bSilver\b/gi, "Prata"],
  [/\bGold\b/gi, "Dourado"],
  [/\bOrange\b/gi, "Laranja"],
  [/\bBeige\b/gi, "Bege"],
  [/\bTeal\b/gi, "Azul Petróleo"],
  [/\bCoral\b/gi, "Coral"],
  [/\bIvory\b/gi, "Marfim"],
  [/\bCream\b/gi, "Creme"],
  [/\bMaroon\b/gi, "Vinho"],
  [/\bOlive\b/gi, "Oliva"],
  [/\bShirt\b/gi, "Camisa"],
  [/\bT.?[Ss]hirt\b/gi, "Camiseta"],
  [/\bSneakers?\b/gi, "Tênis"],
  [/\bTrainers?\b/gi, "Tênis"],
  [/\bShoes?\b/gi, "Tênis"],
  [/\bJacket\b/gi, "Jaqueta"],
  [/\bDress\b/gi, "Vestido"],
  [/\bGown\b/gi, "Vestido"],
  [/\bWatch\b/gi, "Relógio"],
  [/\bBag\b/gi, "Bolsa"],
  [/\bHandbag\b/gi, "Bolsa"],
  [/\bSunglasses?\b/gi, "Óculos de Sol"],
  [/\bGlasses?\b/gi, "Óculos"],
  [/\bHeadphones?\b/gi, "Headphone"],
  [/\bEarphones?\b/gi, "Fone"],
  [/\bEarbuds\b/gi, "Fone de Ouvido"],
  [/\bSpeaker\b/gi, "Caixa de Som"],
  [/\bMouse\b/gi, "Mouse"],
  [/\bKeyboard\b/gi, "Teclado"],
  [/\bMens?\b/gi, "Masculino"],
  [/\bWomen[''']?s?\b/gi, "Feminino"],
  [/\bCasual\b/gi, "Casual"],
  [/\bSlim Fit\b/gi, "Slim Fit"],
  [/\bLeather\b/gi, "Couro"],
  [/\bCotton\b/gi, "Algodão"],
  [/\bPolyester\b/gi, "Poliéster"],
  [/\bInch\b/gi, "Polegadas"],
  [/\bfor (Her|Men|Women|Him)\b/gi, ""],
  [/\bWith\b/gi, "com"],
  [/\band\b/gi, "e"],
  [/\bof\b/gi, "de"],
  [/\bClassic\b/gi, "Clássico"],
  [/\bWireless\b/gi, "Sem Fio"],
  [/\bBluetooth\b/gi, "Bluetooth"],
  [/\bDigital\b/gi, "Digital"],
  [/\bWaterproof\b/gi, "Impermeável"],
  [/\bStainless\b/gi, "Inox"],
  [/\bSteel\b/gi, "Aço"],
  [/\bPortable\b/gi, "Portátil"],
  [/\bAdjustable\b/gi, "Ajustável"],
  [/\bRemovable\b/gi, "Removível"],
  [/\bReusable\b/gi, "Reutilizável"],
  [/\bOrganic\b/gi, "Orgânico"],
  [/\bNatural\b/gi, "Natural"],
  [/\bEssential\b/gi, "Essencial"],
  [/\bLuxury\b/gi, "Luxo"],
  [/\bSport(?:s)?\b/gi, "Esportivo"],
  [/\bRunning\b/gi, "Corrida"],
  [/\bTravel\b/gi, "Viagem"],
  [/\bCamping\b/gi, "Camping"],
  [/\bOffice\b/gi, "Escritório"],
  [/\bGarden\b/gi, "Jardim"],
  [/\bKitchen\b/gi, "Cozinha"],
  [/\bDecoration\b/gi, "Decoração"],
  [/\bFurniture\b/gi, "Móvel"],
  [/\bAccessory\b/gi, "Acessório"],
  [/\bWarranty\b/gi, "Garantia"],
  [/\bSatisfaction\b/gi, "Satisfação"],
  [/\bGuaranteed\b/gi, "Garantido"],
];

const VARIANT_RULES: Record<string, { optionName: string; values: string[] }[]> = {
  "mens-shoes": [{ optionName: "Tamanho", values: ["38", "39", "40", "41", "42"] }],
  "mens-shirts": [{ optionName: "Tamanho", values: ["P", "M", "G", "GG"] }],
  "womens-dresses": [{ optionName: "Tamanho", values: ["PP", "P", "M", "G", "GG"] }],
  tops: [{ optionName: "Tamanho", values: ["PP", "P", "M", "G", "GG"] }],
  smartphones: [{ optionName: "Capacidade", values: ["128GB", "256GB", "512GB"] }],
  tablets: [{ optionName: "Capacidade", values: ["128GB", "256GB", "512GB"] }],
  laptops: [{ optionName: "Tamanho", values: ['13"', '15"', '17"'] }],
};

const COLOR_MAP: Record<string, string> = {
  Red: "Vermelho",
  Black: "Preto",
  Blue: "Azul",
  White: "Branco",
  Green: "Verde",
  Pink: "Rosa",
  Purple: "Roxo",
  Yellow: "Amarelo",
  Gray: "Cinza",
  Grey: "Cinza",
  Silver: "Prata",
  Gold: "Dourado",
  Orange: "Laranja",
  Brown: "Marrom",
  Beige: "Bege",
};

const DESC_TEMPLATES: Record<string, string[]> = {
  Beleza: [
    "{title} original. Produto de alta qualidade para cuidados pessoais e beleza. Aprovado por dermatologistas.",
    "{title} com fórmula especializada para resultados incríveis. Hipoalergênico e cruelty-free.",
  ],
  Perfumes: [
    "{title} original importado. Fragrância marcante e duradoura para todas as ocasiões.",
    "{title} - a essência que combina com seu estilo. Perfume com selo de autenticidade.",
  ],
  "Casa & Decoração": [
    "{title} - peça decorativa de alta qualidade para transformar seu ambiente.",
    "{title} com acabamento premium. Perfeito para decorar sua casa com elegância.",
  ],
  Alimentos: [
    "{title} - produto selecionado com qualidade e frescor. Ideal para o seu dia a dia.",
    "{title} original. Produto alimentício de primeira linha, embalagem lacrada.",
  ],
  Cozinha: [
    "{title} - utensílio essencial para sua cozinha. Material resistente e durável.",
    "{title} com design funcional e materiais de alta qualidade. Fácil de limpar.",
  ],
  Eletrônicos: [
    "{title} original com garantia oficial. Tecnologia de ponta com alto desempenho.",
    "{title} - produto certificado com nota fiscal. Conectividade e performance para seu dia a dia.",
  ],
  Masculino: [
    "{title} - conforto e estilo para o homem moderno. Produto original de alta qualidade.",
    "{title} com acabamento premium. Ideal para todas as ocasiões, do casual ao formal.",
  ],
  Feminino: [
    "{title} - elegância e conforto para o seu guarda-roupa. Peça versátil e sofisticada.",
    "{title} original. Design pensado para valorizar seu estilo com personalidade.",
  ],
  Acessórios: [
    "{title} original. Acessório de alta qualidade para complementar seu visual com sofisticação.",
    "{title} - design elegante e materiais nobres. Acompanha estojo de proteção.",
  ],
  Esportes: [
    "{title} original. Equipamento esportivo de alta performance para seus treinos.",
    "{title} - qualidade profissional para atletas e amantes do esporte.",
  ],
  Veículos: [
    "{title} - alta qualidade e desempenho superior. Produto certificado com garantia.",
    "{title} original. Potência e segurança para o seu veículo.",
  ],
};

const DEFAULT_DESCS = [
  "{title} original. Produto de alta qualidade com acabamento premium e garantia.",
  "{title} - qualidade e confiança que você merece. Produto certificado.",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function translateTitle(title: string, category: string): string {
  let result: string = title;
  for (const [pattern, replacement] of TERM_DICT) {
    result = result.replace(pattern, replacement);
  }
  result = result.replace(/\s+/g, " ").trim();
  const prefix = CATEGORY_PREFIX[category];
  if (prefix && !result.toLowerCase().startsWith(prefix.toLowerCase())) {
    result = `${prefix} ${result}`;
  }
  return result;
}

function extractColors(title: string): string[] {
  const found: string[] = [];
  for (const [en, pt] of Object.entries(COLOR_MAP)) {
    if (new RegExp(`\\b${en}\\b`, "i").test(title)) {
      found.push(pt);
    }
  }
  return [...new Set(found)];
}

function generateDescription(title: string, categoryPt: string): string {
  const templates = DESC_TEMPLATES[categoryPt] || DEFAULT_DESCS;
  return pick(templates).replace("{title}", title);
}

function abbreviate(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 4)
    .toUpperCase();
}

function generateShortHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).toUpperCase().padEnd(4, "0").slice(0, 4);
}

function generateSku(name: string, attributes: Record<string, string>): string {
  const sortedKeys = Object.keys(attributes).sort();
  const attrParts = sortedKeys.map((key) => {
    const val = attributes[key];
    return abbreviate(val ?? "");
  });

  const fullAttrString = sortedKeys.map((key) => `${key}:${attributes[key]}`).join("|");
  const uniqueSeed = `${name.trim()}|${fullAttrString}`;
  const uniqueId = generateShortHash(uniqueSeed);

  const parts = [abbreviate(name), ...attrParts, uniqueId];
  return parts.join("-");
}

function distributeStock(total: number, parts: number): number[] {
  if (parts <= 0) return [];
  const base = Math.floor(total / parts);
  const remainder = total % parts;
  return Array.from({ length: parts }, (_, i) => base + (i < remainder ? 1 : 0));
}

export async function seedProducts(
  prisma: PrismaClient,
  categoryMap: Map<string, string>
): Promise<ProductSeedResult> {
  // ── Read JSONs ──
  const fakeDir = path.resolve(__dirname, "fakeData");
  const allProducts: any[] = [];
  for (let i = 1; i <= 6; i++) {
    const data = JSON.parse(fs.readFileSync(path.join(fakeDir, `products${i}.json`), "utf-8"));
    allProducts.push(...data.products);
  }

  // ── Process products ──
  let totalVariants = 0;
  let totalImages = 0;

  for (let idx = 0; idx < allProducts.length; idx++) {
    const fake = allProducts[idx];
    const catPt = CATEGORY_MAP[fake.category]!;
    const categoryId = categoryMap.get(catPt);
    if (!categoryId) continue;

    const title = translateTitle(fake.title, fake.category);
    const description = generateDescription(title, catPt);
    const slug = generateSlug(title);

    // ── Build variant definitions ──
    const rules = VARIANT_RULES[fake.category];
    const variantDefs: { options: Record<string, string>; price: number; stock: number }[] = [];

    if (rules && rules.length > 0) {
      for (const rule of rules) {
        for (const value of rule.values) {
          variantDefs.push({
            options: { [rule.optionName]: value },
            price: fake.price,
            stock: 0,
          });
        }
      }
    } else {
      const colors = extractColors(fake.title).slice(0, 3);
      if (colors.length > 1) {
        for (const color of colors) {
          variantDefs.push({ options: { Cor: color }, price: fake.price, stock: 0 });
        }
      } else {
        variantDefs.push({ options: {}, price: fake.price, stock: 0 });
      }
    }

    if (variantDefs.length === 0) {
      variantDefs.push({ options: {}, price: fake.price, stock: 0 });
    }

    const stocks = distributeStock(fake.stock, variantDefs.length);
    for (let si = 0; si < variantDefs.length; si++) {
      variantDefs[si]!.stock = stocks[si] ?? 0;
    }

    // ── Create product ──
    const product = await prisma.product.create({
      data: {
        slug,
        title,
        description,
        ratingRate: fake.rating,
        ratingCount: 0,
        totalStock: variantDefs.reduce((s, v) => s + v.stock, 0),
        categoryId,
      },
    });

    // ── Create options ──
    const optNames = [...new Set(variantDefs.flatMap((v) => Object.keys(v.options)))];
    const optValueMap = new Map<string, Map<string, string>>();

    for (const optName of optNames) {
      const option = await prisma.productOption.create({
        data: { name: optName, productId: product.id },
      });
      const values = [...new Set(variantDefs.map((v) => v.options[optName]).filter(Boolean))];
      const valMap = new Map<string, string>();
      for (const val of values) {
        const optVal = await prisma.productOptionValue.create({
          data: { value: val!, productOptionId: option.id },
        });
        valMap.set(val!, optVal.id);
      }
      optValueMap.set(optName, valMap);
    }

    // ── Create variants ──
    const imageUrls: string[] = fake.images ?? [];

    for (let vi = 0; vi < variantDefs.length; vi++) {
      const vd = variantDefs[vi]!;
      const variant = await prisma.productVariant.create({
        data: {
          sku: generateSku(title, vd.options),
          price: vd.price,
          stock: vd.stock,
          weight: fake.weight ?? 0.1,
          isActive: vd.stock > 0,
          productId: product.id,
        },
      });
      totalVariants++;

      for (const [optName, optVal] of Object.entries(vd.options)) {
        const valId = optValueMap.get(optName)?.get(optVal);
        if (valId) {
          await prisma.productVariantOption.create({
            data: { productVariantId: variant.id, productOptionValueId: valId },
          });
        }
      }

      for (const imgUrl of imageUrls) {
        const existing = await prisma.productVariantImage.findFirst({
          where: { variantId: variant.id, url: imgUrl },
        });
        if (!existing) {
          await prisma.productVariantImage.create({
            data: {
              url: imgUrl,
              publicId: `seed/dummyjson/${fake.id}/${imageUrls.indexOf(imgUrl)}`,
              variantId: variant.id,
            },
          });
          totalImages++;
        }
      }
    }
  }

  return { products: allProducts.length, variants: totalVariants, images: totalImages };
}

// ── Standalone execution ──
async function main() {
  console.log("🚀 Iniciando seed de produtos a partir dos dados fake...\n");

  const connectionString = ENV.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  // Cleanup
  console.log("🧹 Limpando tabelas...");
  await prisma.$transaction(async (tx) => {
    await tx.productVariantImage.deleteMany();
    await tx.productVariantOption.deleteMany();
    await tx.productOptionValue.deleteMany();
    await tx.productOption.deleteMany();
    await tx.wishlistItem.deleteMany();
    await tx.wishlist.deleteMany();
    await tx.cartItem.deleteMany();
    await tx.cart.deleteMany();
    await tx.orderItem.deleteMany();
    await tx.couponUsage.deleteMany();
    await tx.order.deleteMany();
    await tx.coupon.deleteMany();
    await tx.review.deleteMany();
    await tx.promotion.deleteMany();
    await tx.productVariant.deleteMany();
    await tx.product.deleteMany();
    await tx.category.deleteMany();
    await tx.refreshToken.deleteMany();
    await tx.address.deleteMany();
    await tx.user.deleteMany();
    await tx.searchSuggestion.deleteMany();
  });
  console.log("✅ Tabelas limpas!\n");

  // Categories
  const ptCategories = [...new Set(Object.values(CATEGORY_MAP))];
  console.log(`🌱 Criando ${ptCategories.length} categorias...`);
  const createdCats = await prisma.$transaction(
    ptCategories.map((name) => prisma.category.create({ data: { name } }))
  );
  const categoryMap = new Map(createdCats.map((c) => [c.name, c.id]));
  console.log(`✅ ${ptCategories.join(", ")}\n`);

  // Products
  console.log("🛍️  Processando produtos...\n");
  const startTime = Date.now();
  const result = await seedProducts(prisma, categoryMap);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  const counts = {
    categories: await prisma.category.count(),
    products: result.products,
    variants: result.variants,
    images: result.images,
  };

  console.log(`\n📊 CONTAGENS FINAIS (${elapsed}s):`);
  for (const [key, val] of Object.entries(counts)) {
    console.log(`   ✓ ${key}: ${val}`);
  }

  console.log(`\n✅ SEED DE PRODUTOS CONCLUÍDO! ✅\n`);

  await prisma.$disconnect();
  await pool.end();
}

const isMain = process.argv[1]?.includes("seed-products");
if (isMain) {
  main().catch(async (e) => {
    console.error("\n❌ ERRO NO SEED:", e);
    process.exit(1);
  });
}
