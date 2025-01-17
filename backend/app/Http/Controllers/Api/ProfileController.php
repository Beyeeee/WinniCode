<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Pembaca;

class ProfileController extends Controller
{
    public function getUser()
    {
        $idUser = Auth::user()->id_user;
        $user = User::where('id_user', $idUser)->first();

        return response([
            'message' => 'Data Pembaca Retrieved',
            'data' => $user
        ], 200);

    }

    public function updateProfilePicture(Request $request)
    {
        $idUser = Auth::user()->id_user;
        $user = User::where('id_user', $idUser)->first();

        // Validasi input gambar
        $validate = Validator::make($request->all(), [
            'image_user' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Validasi untuk tipe gambar dan ukuran maksimal
        ]);

        if ($validate->fails()) {
            return response(['message' => 'Invalid image file. Please upload a valid image file.'], 422);
        }

        if ($request->hasFile('image_user')) {
            $uploadFolder = 'gambar';

            $image = $request->file('image_user');
        
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $uploadedImageResponse = basename($image_uploaded_path);

            if ($user->image_user) {
                Storage::disk('public')->delete($uploadFolder . '/' . $user->image_user);
            }

            $user->image_user = $uploadedImageResponse;
        }

        $user->save();

        return response([
            'message' => 'Profile image updated successfully',
            'data' => $user,
        ], 200);
    }

}