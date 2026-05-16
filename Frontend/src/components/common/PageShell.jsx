import Spinner from "./Spinner";

export function PageLoading({ message = "Loading..." }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3" role="status" aria-live="polite">
      <Spinner size="lg" />
      <p className="text-sm text-slate-500">{message}</p>
    </div>
  );
}

export function PageError({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold text-slate-900 mb-1">{title}</h2>
        {message && <p className="text-sm text-slate-500 mb-4">{message}</p>}
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}
