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
      <div className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-around">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            onClick={onSortClick}
          >
            <span aria-hidden>⇅</span>
            <span>Sort</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold cursor-pointer"
            onClick={onFilterClick}
          >
            <span aria-hidden>⚙️</span>
            <span>Filter</span>
          </button>
        </div>
      </div>
    </div>
  );
}
