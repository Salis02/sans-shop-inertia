import { Head, useForm, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Categories', href: '/admin/categories' },
    { title: 'Create', href: '/admin/categories/create' },
]

// export default function CreateCategory({ parents }: { parents: { id: number; name: string }[] }) {
export default function CreateCategory({ parents = [] }: { parents?: { id: number; name: string }[] }) {
    const { data, setData, post, processing, errors } = useForm<{
        name: string
        parent_id: string | null
        description: string
    }>({
        name: '',
        parent_id: null,
        description: '',
    })


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/admin/categories')
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="max-w-lg p-6 mx-auto">
                <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

                <div className="relative rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            />
                            {errors.name && (
                                <div className="text-sm text-red-600 mt-1">{errors.name}</div>
                            )}
                        </div>

                        {/* Parent Category */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Parent Category</label>
                            <select
                                value={data.parent_id}
                                onChange={(e) => setData('parent_id', e.target.value || null)}
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                            >
                                <option value="">-- No Parent (Main Category) --</option>
                                {parents.map((parent) => (
                                    <option key={parent.id} value={parent.id}>
                                        {parent.name}
                                    </option>
                                ))}
                            </select>
                            {errors.parent_id && (
                                <div className="text-sm text-red-600 mt-1">{errors.parent_id}</div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                                rows={3}
                            />
                            {errors.description && (
                                <div className="text-sm text-red-600 mt-1">{errors.description}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    )
}
