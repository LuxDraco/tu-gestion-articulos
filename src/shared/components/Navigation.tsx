import {NavLink} from 'react-router-dom';

export const Navigation = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow">
            <div className="container mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <NavLink
                            to="/articles"
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded-md text-sm font-medium
                ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
                            }
                        >
                            Articles
                        </NavLink>
                        <NavLink
                            to="/categories"
                            className={({ isActive }) =>
                                `flex items-center px-3 py-2 rounded-md text-sm font-medium
                ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`
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