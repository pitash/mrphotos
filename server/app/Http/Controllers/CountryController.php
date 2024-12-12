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
            'name' => 'required|string|max:255',
        ]);

        $data = Country::create([
            'name' => $request->name,
            'is_active' => true,
        ]);

        return redirect()->route('country.index')->with('success', 'Slider created successfully.');
    }

    public function edit($id)
    {
        $slider = Country::findOrFail($id);
        return view('country.edit', compact('slider'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $data = Country::findOrFail($id);

        $data->tag = $request->name;
        $data->save();

        return redirect()->route('country.index')->with('success', 'Slider updated successfully.');
    }

    public function toggleStatus($id)
    {
        $country = Country::findOrFail($id);
        $country->is_active = !$country->is_active;
        $country->save();

        return redirect()->route('country.index')->with('success', 'Country status updated successfully.');
    }
}
