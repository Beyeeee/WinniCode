<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

use App\Models\Komentar;
use App\Models\Berita;
use App\Models\User;
use App\Models\Pembaca;

class KomentarController extends Controller
{
    public function index($idBerita)
    {
        $berita = Berita::where('id_berita', $idBerita)->first();

        if (is_null($berita)) {
            return response(['message' => 'Berita Not Found'], 404);
        }

        $komentar = Komentar::where('id_berita', $berita->id_berita)->get();

        return response([
            'message' => 'All Komentar Retrieved',
            'data' => $komentar
        ], 200);
    }

    public function store($idBerita, Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'isi_komentar' => 'required'
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $idUser = Auth::user()->id_user;
        $username = Auth::user()->username;
        $pembaca = Pembaca::where('id_user', $idUser)->first();
        if (is_null($pembaca)) {
            return response(['message' => 'User Not Found'], 404);
        }

        $storeData['id_berita'] = $idBerita;
        $storeData['nama_pengomentar'] = $username;
        $storeData['id_pembaca'] = $pembaca->id_pembaca; 
        $storeData['tanggal_komentar'] = now();

        $komentar = Komentar::create([
            'id_pembaca' => $storeData['id_pembaca'],
            'id_berita' => $storeData['id_berita'],
            'nama_pengomentar' => $storeData['nama_pengomentar'],
            'tanggal_komentar' => $storeData['tanggal_komentar'],
            'isi_komentar' => $storeData['isi_komentar']
        ]);

        return response([
            'message' => 'Komentar Added Successfully',
            'data' => $komentar,
        ],200);
    }

    public function show(string $id)
    {
        $komentar = Komentar::find($id);

        if($komentar){
            return response([
                'message' => 'Komentar Found',
                'data' => $komentar
            ],200);
        }

        return response([
            'message' => 'Komentar Not Found',
            'data' => null
        ],404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $komentar = Komentar::find($id);
        if(is_null($komentar)){
            return response([
                'message' => 'Komentar Not Found',
                'data' => null
            ],404);
        }

        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'nama_role' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $komentar->update($updateData);

        return response([
            'message' => 'Komentar Updated Successfully',
            'data' => $komentar,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $komentar = Komentar::find($id);

        if(is_null($komentar)){
            return response([
                'message' => 'Komentar Not Found',
                'data' => null
            ],404);
        }

        if($komentar->delete()){
            return response([
                'message' => 'Komentar Deleted Successfully',
                'data' => $komentar,
            ],200);
        }

        return response([
            'message' => 'Delete Komentar Failed',
            'data' => null,
        ],400);
    }
}
