<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = Category::query()
        ->with('parent')
        ->withCount('products')
        ->when($request->search, function ($query, $search){
            $query->where('name', 'like', "%{ $search }%");
        })
        ->latest()
        ->paginate(10)
        ->withQueryString();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create (): Response
    {
        $parentCategories = Category::whereNull('parent_id')->get();

        return Inertia::render('Admin/Categories/Create', [
            'parentCategories' => $parentCategories,
        ]);
    }

    
}
