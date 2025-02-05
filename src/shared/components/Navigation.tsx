import { NavLink } from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-8">
                        <NavLink
                            to="/articles"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    isActive
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            Articles
                        </NavLink>
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    isActive
                                        ? 'border-blue-500 text-gray-900'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`
                            }
                        >
                            Categories
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};