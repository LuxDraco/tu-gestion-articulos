interface ErrorFallbackProps {
    error?: Error;
}

export const ErrorFallback = ({error}: ErrorFallbackProps) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            {error && (
                <pre className="text-sm bg-gray-100 p-4 rounded-sm overflow-auto">
            {error.message}
        </pre>
            )}
            <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-sm hover:bg-blue-600"
            >
                Reload Page
            </button>
        </div>
    </div>
);