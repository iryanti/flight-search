"use client";

type MobileBottomBarProps = {
  onSortClick: () => void;
  onFilterClick: () => void;
};

export default function MobileBottomBar({
  onSortClick,
  onFilterClick,
}: MobileBottomBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div
        className="border-t"
        style={{
          background: "var(--bc-card)",
          borderTopColor: "var(--bc-border)",
        }}
      >
        <div
          className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-around"
          style={{
            background: "var(--bc-card)",
            borderColor: "var(--bc-border)",
          }}
        >
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            onClick={onSortClick}
          >
            <img
              src="https://fonts.gstatic.com/s/i/materialicons/swap_vert/v6/24px.svg"
              alt="Sort"
              className="w-4 h-4 opacity-80 dark:invert"
            />{" "}
            <span>Sort</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            onClick={onFilterClick}
          >
            <img
              src="https://fonts.gstatic.com/s/i/materialicons/sort/v6/24px.svg"
              alt="Sort"
              className="w-4 h-4 opacity-80 dark:invert"
            />
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
