"use client";

export default function BottomSheet({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="Close"
      />

      <div className="absolute left-0 right-0 bottom-0 bg-white dark:bg-gray-900 rounded-t-2xl shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">{title}</div>
          <button className="text-sm font-semibold" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="max-h-[70vh] overflow-auto pb-2">{children}</div>
      </div>
    </div>
  );
}
