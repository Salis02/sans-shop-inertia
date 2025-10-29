import { Head, Link, useForm, router } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern'
import { useState } from 'react'

interface Category {
    id: number
    name: string
    slug: string
    product_count?: number
}

interface Pagination {
    current_page: number
    last_page: number
    links: { url: string | null; label: string; active: boolean }[]
}

interface Props {
    categories: {
        data: Category[]
        meta: Pagination
    }
    filters: {
        search?: string
    }
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/admin/categories' },
]

export default function CategoriesIndex({ categories, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '')

    const handleDelete = (id: number) => {
        if (confirm('Yakin ingin menghapus kategori ini?')) {
            router.delete(`/admin/categories/${id}`)
        }
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.get('/admin/categories', { search })
    }

    const items = categories.data || []

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">All Categories</h2>
                    <Link
                        href="/admin/categories/create"
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        + Add Category
                    </Link>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari kategori..."
                        className="flex-1 rounded-lg border border-gray-300 p-2 text-sm"
                    />
                    <button
                        type="submit"
                        className="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
                    >
                        Search
                    </button>
                </form>

                {/* Table */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-700">
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
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700">
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
                                            {category.product_count || 0} produk
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                            <Link
                                                href={`/admin/categories/${category.id}/edit`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(category.id)}
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
                {/* List */}
                {items.length === 0 ? (
                    <div className="relative min-h-[200px] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="relative z-10 flex h-full items-center justify-center text-gray-500">
                            No categories found.
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-3">
                        {items.map((cat) => (
                            <div
                                key={cat.id}
                                className="relative rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border"
                            >
                                <h3 className="font-medium text-gray-800 dark:text-gray-100">
                                    {cat.name}
                                </h3>
                                <p className="text-sm text-gray-500">Slug: {cat.slug}</p>
                                {cat.product_count && (
                                    <p className="mt-2 text-xs text-gray-400">
                                        {cat.product_count} products
                                    </p>
                                )}
                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href={`/admin/categories/${cat.id}/edit`}
                                        className="rounded-md bg-yellow-500 px-3 py-1 text-xs font-semibold text-white hover:bg-yellow-600"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {categories?.meta?.links?.length > 1 && (
                    <div className="flex justify-center gap-2 mt-6">
                        {categories.meta.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`rounded-md border px-3 py-1 text-sm ${link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    )
}
