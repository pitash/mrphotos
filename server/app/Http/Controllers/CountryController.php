<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $datas = Country::all();
        return view('country.index', compact('datas'));
    }
    public function create()
    {
        return view('country.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:countries,name',
        ], [
            'name.unique' => 'The country name already exists.'
        ]);

        $data = Country::create([
            'name' => $request->name,
            'is_active' => true,
        ]);

        return redirect()->route('country.index')->with('success', 'Country created successfully.');
    }

    public function edit($id)
    {
        $data = Country::findOrFail($id);

        return response()->json([
            'name' => $data->name,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:countries,name,' . $id,
        ]);

        $data = Country::findOrFail($id);

        $data->name  = $request->name;
        $data->save();

        return redirect()->route('country.index')->with('success', 'Country updated successfully.');
    }

    public function toggleStatus($id)
    {
        $country = Country::findOrFail($id);
        $country->is_active = !$country->is_active;
        $country->save();

        return redirect()->route('country.index')->with('success', 'Country status updated successfully.');
    }
}
