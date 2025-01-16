<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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
            'email' => 'required|string|email',
            'map_address' => 'required|string',
        ]);

        try {
            $data = Contact::first() ?? new Contact();

            $data->address = $request->address;
            $data->phone = $request->phone;
            $data->email = $request->email;
            $data->map_address = $request->map_address;
            $data->save();

            return redirect()->route('contact')->with('success', 'Contact updated successfully.');
        } catch (\Exception $e) {
            //Log::error('Contact Update Failed: ' . $e->getMessage());
            return redirect()->back()->withErrors('Failed to update contact. Please try again.');
        }
    }
}
