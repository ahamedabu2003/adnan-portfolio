<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
{
    $about = About::first();

    $skills = Skill::all();

    $projects = Project::all();

    $experiences = Experience::all();

    return view('frontend.home',
    compact(
        'about',
        'skills',
        'projects',
        'experiences'
    ));
}
}
