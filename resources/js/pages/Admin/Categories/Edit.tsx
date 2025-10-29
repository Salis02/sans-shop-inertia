import { Head, useForm, Link } from '@inertiajs/react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'

interface Props {
    category: {
        id: number
        name: string
        slug: string
    }
}

export default function EditCategory({ category }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        name: category.name,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        put(`/admin/categories/${category.id}`)
    }

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: '/admin/categories' },
        { title: `Edit: ${category.name}`, href: '#' },
    ]

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${category.name}`} />
            <div className="max-w-lg p-6 mx-auto">
                <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                    <button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Update
                    </button>
                </form>
            </div>
        </AppLayout>
    )
}
