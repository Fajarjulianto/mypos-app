import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "An error occurred while loading data. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 py-16 text-center bg-white rounded-2xl border border-red-100 shadow-sm">
      {/* Error Icon */}
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-50/50">
        <AlertTriangle className="h-8 w-8 text-red-500" />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

      <p className="text-sm text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
        {message}
      </p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95 shadow-sm"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};
