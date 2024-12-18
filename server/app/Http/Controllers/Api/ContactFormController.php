<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Log;
use App\Models\ContactForm;
use Illuminate\Http\Request;

class ContactFormController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Log the incoming request data
            Log::info('Contact form submission received:', $request->all());

            // Validate the incoming form data
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'subject' => 'required|string|max:255',
                'email' => 'required|email',
                'phone' => 'nullable|string',
                'message' => 'required|string',
            ]);

            // Log the validation success
            Log::info('Validation successful.', $validated);

            // Create a new ContactForm entry in the database
            $contactForm = ContactForm::create([
                'name' => $validated['name'],
                'subject' => $validated['subject'],
                'email' => $validated['email'],
                'phone' => $validated['phone'],
                'message' => $validated['message'],
            ]);

            // Log the successful record creation
            Log::info('Contact form stored successfully:', ['contactForm' => $contactForm]);

            return response()->json([
                'message' => 'Form submitted successfully!',
                'data' => $contactForm,
            ]);

        } catch (\Exception $e) {
            // Log the error
            Log::error('Error in storing contact form: ' . $e->getMessage());

            return response()->json(['error' => 'An error occurred while storing the form data.'], 500);
        }
    }
}
