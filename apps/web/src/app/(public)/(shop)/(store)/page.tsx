import { HeroBanner } from "@/shared/components/store/Banner";
import { CategoriesSection } from "@/shared/components/store/CategoriesSection/CategoriesSection";
import { HOME_CATEGORIES } from "@/shared/components/store/CategoriesSection/categoryConsts";
import { FlashSaleSection } from "@/shared/components/store/FlashSaleSection/FlashSaleSection";
import { ForYouSection } from "@/shared/components/store/ForYouSection/ForYouSection";
import { Header } from "@/shared/components/store/Header/Header";

const Home = async () => {
  return (
    <div className="relative z-10 overflow-x-hidden">
      <Header />
      <HeroBanner />
      <main className="max-w-9xl mx-auto flex flex-col bg-white pb-14 lg:pb-0">
        <CategoriesSection categories={HOME_CATEGORIES} />

        <FlashSaleSection />

        <ForYouSection />
      </main>
    </div>
  );
};

export default Home;
