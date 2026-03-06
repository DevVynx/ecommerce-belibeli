export const SearchInput = () => {
  return (
    <div className="relative flex flex-1 items-center">
      <input
        placeholder="Ache os seus produtos de forma rápida..."
        type="text"
        className="w-full rounded-full border border-black/90 px-3 py-2 pl-10 text-ellipsis outline-none"
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="absolute left-3 size-5 h-full"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>
  );
};
