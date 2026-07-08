<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'mobile' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        ContactMessage::create($request->only('name', 'email', 'mobile', 'message'));

        return redirect()->route('home')->with('success', 'Your message has been sent successfully!');
    }
}
