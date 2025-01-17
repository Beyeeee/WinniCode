<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register',[App\Http\Controllers\Api\AuthController::class,'register']);
Route::post('/login',[App\Http\Controllers\Api\AuthController::class,'login']);
Route::post('/registerPegawai',[App\Http\Controllers\Api\AuthController::class,'registerPegawai']);

Route::get('/verify/{verify_key}', [App\Http\Controllers\Api\AuthController::class, 'verify'])->name('verify');

Route::get('/berita/{id}', [App\Http\Controllers\Api\BeritaController::class, 'show']);
Route::get('/berita/kategori/{category}', [App\Http\Controllers\Api\BeritaController::class, 'showByKategori']);
Route::get('/beritaTrending', [App\Http\Controllers\Api\BeritaController::class, 'showTrending']);
Route::get('/beritaTerkini', [App\Http\Controllers\Api\BeritaController::class, 'showTerkini']);

Route::get('/iklanRandom', [App\Http\Controllers\Api\IklanController::class, 'getRandomIklan']);

Route::get('/kategori', [App\Http\Controllers\Api\KategoriController::class, 'index']);

Route::get('/komentar/{id}', [App\Http\Controllers\Api\KomentarController::class, 'index']);

Route::middleware('auth:api', 'Admin')->group(function(){
    
    //Berita
    Route::get('/berita', [App\Http\Controllers\Api\BeritaController::class, 'index']);
    Route::post('/berita', [App\Http\Controllers\Api\BeritaController::class, 'store']);
    Route::put('/berita/{id}', [App\Http\Controllers\Api\BeritaController::class, 'update']);
    Route::delete('/berita/{id}', [App\Http\Controllers\Api\BeritaController::class, 'destroy']);

    //Iklan
    Route::get('/iklan', [App\Http\Controllers\Api\IklanController::class, 'index']);
    Route::post('/iklan', [App\Http\Controllers\Api\IklanController::class, 'store']);
    Route::get('/iklan/{id}', [App\Http\Controllers\Api\IklanController::class, 'show']);
    Route::put('/iklan/{id}', [App\Http\Controllers\Api\IklanController::class, 'update']);
    Route::delete('/iklan/{id}', [App\Http\Controllers\Api\IklanController::class, 'destroy']);

    //Kategori
    Route::post('/kategori', [App\Http\Controllers\Api\KategoriController::class, 'store']);
    Route::get('/kategori/{id}', [App\Http\Controllers\Api\KategoriController::class, 'show']);
    Route::put('/kategori/{id}', [App\Http\Controllers\Api\KategoriController::class, 'update']);
    Route::delete('/kategori/{id}', [App\Http\Controllers\Api\KategoriController::class, 'destroy']);
});

Route::middleware('auth:api', 'Pembaca')->group(function(){

    //Profile
    Route::get('/profile', [App\Http\Controllers\Api\ProfileController::class, 'getUser']);
    Route::post('/updateImage', [App\Http\Controllers\Api\ProfileController::class, 'updateProfilePicture']);

    //Komentar
    Route::post('/berita/{id}/komentar', [App\Http\Controllers\Api\KomentarController::class, 'store']);
    Route::put('/komentar/{id}', [App\Http\Controllers\Api\KomentarController::class, 'update']);
    Route::delete('/komentar/{id}', [App\Http\Controllers\Api\KomentarController::class, 'destroy']);

    //Favorit
    Route::get('/favorit', [App\Http\Controllers\Api\FavoritController::class, 'getFavoritByLogin']);
    Route::post('/favorit', [App\Http\Controllers\Api\FavoritController::class, 'addToFavorite']);
    Route::get('/favorit/status/{id}', [App\Http\Controllers\Api\FavoritController::class, 'checkStatus']);
    Route::get('/favorit/{id}', [App\Http\Controllers\Api\FavoritController::class, 'show']);
    Route::delete('/favorit/{id}', [App\Http\Controllers\Api\FavoritController::class, 'destroy']);
});

//Role
Route::get('/role', [App\Http\Controllers\Api\RoleController::class, 'index']);
Route::post('/role', [App\Http\Controllers\Api\RoleController::class, 'store']);
Route::get('/role/{id}', [App\Http\Controllers\Api\RoleController::class, 'show']);
Route::put('/role/{id}', [App\Http\Controllers\Api\RoleController::class, 'update']);
Route::delete('/role/{id}', [App\Http\Controllers\Api\RoleController::class, 'destroy']);



