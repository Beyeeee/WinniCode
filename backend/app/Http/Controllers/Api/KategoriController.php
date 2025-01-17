<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Models\Kategori;

class KategoriController extends Controller
{
    public function index()
    {
        $kategori = Kategori::inRandomOrder()->get();

        return response([
            'message' => 'All Kategori Retrieved',
            'data' => $kategori
        ], 200);
    }

    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'nama_kategori' => 'required',
            'icon_kategori' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $kategori = Kategori::create($storeData);

        return response([
            'message' => 'Kategori Added Successfully',
            'data' => $kategori,
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategori = Kategori::find($id);

        if($kategori){
            return response([
                'message' => 'Kategori Found',
                'data' => $kategori
            ],200);
        }

        return response([
            'message' => 'Kategori Not Found',
            'data' => null
        ],404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $kategori = Kategori::find($id);
        if(is_null($kategori)){
            return response([
                'message' => 'Kategori Not Found',
                'data' => null
            ],404);
        }

        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'nama_kategori' => 'required',
            'icon_kategori' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $kategori->update($updateData);

        return response([
            'message' => 'Kategori Updated Successfully',
            'data' => $kategori,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kategori = Kategori::find($id);

        if(is_null($kategori)){
            return response([
                'message' => 'Kategori Not Found',
                'data' => null
            ],404);
        }

        if($kategori->delete()){
            return response([
                'message' => 'Kategori Deleted Successfully',
                'data' => $kategori,
            ],200);
        }

        return response([
            'message' => 'Delete Kategori Failed',
            'data' => null,
        ],400);
    }
}
