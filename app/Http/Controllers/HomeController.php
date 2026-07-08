<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Cv;
use App\Models\Experience;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
{
    $about = About::first();

    $skills = Skill::all();

    $projects = Project::all();

    $experiences = Experience::all();

    $cv = Cv::latest()->first();
    $admin = User::where('is_admin', 1)->first();

    return view('frontend.home',
    compact(
        'about',
        'skills',
        'projects',
        'experiences',
        'cv',
        'admin'
    ));
}
}
