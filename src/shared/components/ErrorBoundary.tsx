import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export const RouterErrorBoundary = () => {
    const error = useRouteError();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
                <div className="text-sm bg-gray-100 p-4 rounded overflow-auto">
                    {isRouteErrorResponse(error) ? (
                        <>
                            <h3 className="font-bold">{error.status} {error.statusText}</h3>
                            <p>{error.data}</p>
                        </>
                    ) : error instanceof Error ? (
                        <>
                            <h3 className="font-bold">{error.name}</h3>
                            <p>{error.message}</p>
                        </>
                    ) : (
                        <p>Unknown error occurred</p>
                    )}
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Reload Page
                </button>
            </div>
        </div>
    );
};
