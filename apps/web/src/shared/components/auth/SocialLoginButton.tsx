import Image, { type StaticImageData } from "next/image";

import { Button } from "@/shared/components/shadcn-ui/button";

type Props = {
  src: StaticImageData;
  alt: string;
};

export const SocialLoginButton = ({ src, alt }: Props) => {
  return (
    <Button
      variant="outline"
      className="border-border flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border py-2 font-semibold transition-colors"
    >
      <span className="bg-border/40 flex items-center justify-center rounded-full p-1">
        <Image src={src} alt={alt} className="h-6 w-6" />
      </span>
      <span>{alt}</span>
    </Button>
  );
};
