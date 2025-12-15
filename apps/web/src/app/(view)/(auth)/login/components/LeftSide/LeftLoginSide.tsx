import GeometricPattern from "@/app/shared/assets/images/backgrounds/gray-geometric-pattern.jpg";

export const LeftLoginSide = () => {
  return (
    <div
      className="hidden flex-1 bg-center lg:flex"
      style={{ backgroundImage: `url(${GeometricPattern.src})` }}
    >
      <div className="mx-auto flex w-fit flex-col items-center justify-center">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tighter">
          Bem-vindo de volta à{" "}
          <span className="font-kotta">BeliBeli Shop.</span>
        </h1>
        <p className="self-start font-mono text-black/60">
          Os melhores produtos estão a um clique!
        </p>
      </div>
    </div>
  );
};
