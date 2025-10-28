// resources/js/Pages/Admin/Categories/Index.tsx
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { useState, useEffect, FormEvent } from 'react';
import { Category, PaginatedData, PageProps } from '@/types';
import { route } from 'ziggy-js';

interface Props extends PageProps {
    categories: PaginatedData<Category>;
    filters: {
        search?: string;
    };
}

export default function Index({ categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                route('admin.categories.index'),
                { search },
                {
                    preserveState: true,
                    replace: true,
                }
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search]);

    const deleteCategory = (id: number) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            router.delete(route('admin.categories.destroy', id));
        }
    };

    return (
        <AdminLayout>
            <Head title="Kategori" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Kategori Produk
                        </h1>
                        <Link
                            href={route('admin.categories.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            + Tambah Kategori
                        </Link>
                    </div>

                    {/* Search */}
                    <div className="mb-4">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari kategori..."
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Parent
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Produk
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {categories.data.length > 0 ? (
                                    categories.data.map((category) => (
                                        <tr key={category.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {category.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {category.slug}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.parent?.name || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {category.products_count || 0} produk
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                <Link
                                                    href={route('admin.categories.edit', category.id)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => deleteCategory(category.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-4 text-center text-gray-500"
                                        >
                                            Tidak ada data kategori
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-gray-700">
                            Showing {categories.from} to {categories.to} of{' '}
                            {categories.total} results
                        </div>
                        <div className="flex space-x-1">
                            {categories.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`px-3 py-1 border rounded ${link.active
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 hover:bg-gray-50'
                                        } ${!link.url && 'cursor-not-allowed opacity-50'}`}
                                    preserveState
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}