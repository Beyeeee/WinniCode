<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Models\Iklan;
use App\Models\User;
use App\Models\Pegawai;

class IklanController extends Controller
{
    public function index()
    {
        $iklan = Iklan::inRandomOrder()->get();

        return response([
            'message' => 'All Iklan Retrieved',
            'data' => $iklan
        ], 200);
    }

    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'nama_iklan' => 'required',
            'gambar_iklan' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'link_iklan' => 'required|url',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $idUser = Auth::user()->id_user;
        $pegawai = Pegawai::where('id_user', $idUser)->first();
        if (is_null($pegawai)) {
            return response(['message' => 'User Not Found'], 404);
        }

        $uploadFolder = 'gambar';
        $image = $request->file('gambar_iklan');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        $storeData['gambar_iklan'] = $uploadedImageResponse;
        $storeData['id_pegawai'] = $pegawai->id_pegawai; 

        $iklan = Iklan::create([
            'id_pegawai' => $storeData['id_pegawai'],
            'nama_iklan' => $storeData['nama_iklan'],
            'gambar_iklan' => $storeData['gambar_iklan'],
            'link_iklan' => $storeData['link_iklan']
        ]);

        return response([
            'message' => 'Iklan Added Successfully',
            'data' => $iklan,
        ],200);
    }

    public function getRandomIklan()
    {
        $iklan = Iklan::inRandomOrder()->first();

        if ($iklan) {
            return response([
                'message' => 'Random Iklan Retrieved Successfully',
                'data' => $iklan,
            ], 200);
        }

        return response([
            'message' => 'No Iklan Found',
            'data' => null,
        ], 404);
    }

    public function show(string $id)
    {
        $iklan = Iklan::find($id);

        if($iklan){
            return response([
                'message' => 'Iklan Found',
                'data' => $iklan
            ],200);
        }

        return response([
            'message' => 'Iklan Not Found',
            'data' => null
        ],404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $iklan = Iklan::find($id);
        if(is_null($iklan)){
            return response([
                'message' => 'Iklan Not Found',
                'data' => null
            ],404);
        }

        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'nama_iklan' => 'required',
            'link_iklan' => 'required|url',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $iklan->update($updateData);

        return response([
            'message' => 'Iklan Updated Successfully',
            'data' => $iklan,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $iklan = Iklan::find($id);

        if(is_null($iklan)){
            return response([
                'message' => 'Iklan Not Found',
                'data' => null
            ],404);
        }

        if($iklan->delete()){
            return response([
                'message' => 'Iklan Deleted Successfully',
                'data' => $iklan,
            ],200);
        }

        return response([
            'message' => 'Delete Iklan Failed',
            'data' => null,
        ],400);
    }
}
