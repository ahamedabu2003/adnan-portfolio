<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\CvController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ExperienceController;
use App\Http\Controllers\Admin\ProjectController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/', [HomeController::class, 'index']);
Route::middleware(['auth', 'admin'])->prefix('admin')->group(function () {

 Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');

    Route::resource('about', AboutController::class);

    Route::resource('cvs',CvController::class);
        
    Route::resource('experience', ExperienceController::class);

    Route::resource('projects', ProjectController::class);

    Route::resource('skills', SkillController::class);

});
require __DIR__ . '/auth.php';
