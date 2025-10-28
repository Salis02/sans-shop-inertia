// resources/js/Layouts/AdminLayout.tsx
import { Link } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import { route } from 'ziggy-js';

export default function AdminLayout({ children }: PropsWithChildren) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } bg-white w-64 border-r`}
            >
                <div className="h-full px-3 py-4 overflow-y-auto">
                    <div className="mb-6 px-3">
                        <h2 className="text-xl font-bold text-gray-800">
                            Admin Panel
                        </h2>
                    </div>

                    <ul className="space-y-2">
                        <li>
                            <Link
                                href="/admin/dashboard"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <span>📊 Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.users.index')}
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <span>👤 Users</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.categories.index')}
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <span>📁 Kategori</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('admin.products.index')}
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <span>📦 Produk</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/admin/orders"
                                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                            >
                                <span>🛒 Orders</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <div className={`${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all`}>
                {/* Navbar */}
                <nav className="bg-white border-b px-4 py-3">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ☰
                        </button>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">Admin User</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-red-600 hover:text-red-800"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <main>{children}</main>
            </div>
        </div>
    );
}