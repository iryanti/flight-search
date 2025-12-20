export default function FlightCardSkeleton() {
  return (
    <div
      className="rounded-2xl border dark:bg-gray-800 dark:border-gray-700 shadow-sm overflow-hidden"
      aria-hidden
    >
      <div className="p-4 md:p-5 animate-pulse">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-11 w-11 rounded-lg bg-gray-200 dark:bg-gray-700" />
            <div className="min-w-0">
              <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
            </div>
          </div>

          <div className="text-right">
            <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
            <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2 ml-auto" />
          </div>
        </div>

        {/* Route */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded mt-2" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-2 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>

          <div className="text-right">
            <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
            <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded mt-2 ml-auto" />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-10 w-28 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
