<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {

    }

    public function create()
    {
        $countries = Country::where('is_active', true)->get();
        return view('blog.create', compact('countries'));
    }

}
