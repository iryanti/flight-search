type ErrorStateProps = {
  message?: string;
  onRetry: () => void | Promise<void>;
  title?: string;
};

export default function ErrorState({
  message = "Please try again.",
  onRetry,
  title = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold text-red-600" role="alert">
        {title}
      </div>

      <div className="text-sm text-gray-600 mt-1" aria-live="assertive">
        {message}
      </div>

      <button
        type="button"
        className="mt-4 px-4 py-2 rounded-xl text-white font-semibold cursor-pointer"
        style={{ background: "var(--bc-primary)" }}
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
}
