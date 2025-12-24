import Link from "next/link";

import { PlusIcon } from "@/app/shared/assets/animatedIcons/plus";

export const ExplorationSection = () => {
  return (
    <Link href={"/"}>
      <section className="group my-20 cursor-pointer rounded-2xl border border-gray-200 bg-neutral-100 py-10 transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:bg-neutral-200 hover:shadow-lg">
        <div className="flex flex-col space-y-5 text-center">
          <div className="mx-auto flex justify-center rounded-full border border-gray-200 bg-white p-3 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-300 group-hover:shadow-sm">
            <PlusIcon
              size={40}
              className="transition-transform duration-300 group-hover:rotate-90"
            />
          </div>

          <h1 className="text-2xl font-semibold transition-colors duration-300 group-hover:text-black">
            Continue explorando
          </h1>

          <p className="text-gray-500 transition-colors duration-300 group-hover:text-gray-800">
            Explore nossas categorias e encontre mais produtos incríveis para adicionar à sua lista.
          </p>
        </div>
      </section>
    </Link>
  );
};
