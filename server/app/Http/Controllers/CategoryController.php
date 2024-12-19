<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $datas = Category::all();
        return view('category.index', compact('datas'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Category::create([
            'name' => $request->name,
            'is_active' => true,
        ]);

        return redirect()->route('category.index')->with('success', 'Category created successfully.');
    }

    public function edit($id)
    {
        $data = Category::findOrFail($id);

        return response()->json([
            'name' => $data->name,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $data = Category::findOrFail($id);

        $data->name = $request->name;
        $data->save();

        return redirect()->route('category.index')->with('success', 'Category updated successfully.');
    }

    public function toggleStatus($id)
    {
        $data = Category::findOrFail($id);
        $data->is_active = !$data->is_active;
        $data->save();

        return redirect()->route('category.index')->with('success', 'Category status updated successfully.');
    }

}
