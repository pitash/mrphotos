<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function edit()
    {
        $data = Contact::first();
        return view('contact.contact', compact('data'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'address' => 'required|string',
            'phone' => 'required|string',
            'email' => 'required|string',
            'map_address' => 'required|string',
        ]);

        $data = Contact::first();

        $data->update([
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'map_address' => $request->map_address,
        ]);

        return redirect()->route('contact.edit')->with('success', 'Contact updated successfully.');
    }
}
