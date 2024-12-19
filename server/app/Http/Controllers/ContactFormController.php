<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactForm;

class ContactFormController extends Controller
{
    public function index()
    {
        $contactForms = ContactForm::orderBy('created_at', 'desc')->get();
        return view('contactforms.index', compact('contactForms'));
    }
}
