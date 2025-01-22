<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

use App\Models\Favorit;
use App\Models\User;
use App\Models\Pembaca;
use App\Models\Berita;

class FavoritController extends Controller
{
    public function index()
    {
        $favorit = Favorit::inRandomOrder()->get();

        return response([
            'message' => 'All Favorit Retrieved',
            'data' => $favorit
        ], 200);
    }

    public function getFavoritByLogin()
    {
        $idUser = Auth::user()->id_user;
        $pembaca = Pembaca::where('id_user', $idUser)->first();

        if (!$pembaca) {
            return response([
                'message' => 'Pembaca tidak ditemukan.',
                'isFavorit' => false,
            ], 404);
        }

        $favorit = Favorit::where('id_pembaca', $pembaca->id_pembaca)->get();
        
        $beritaIds = $favorit->pluck('id_berita');
        $berita = Berita::whereIn('id_berita', $beritaIds)->get();

        return response([
            'message' => 'Berhasil Retrieved semua Favorit',
            'data' => $berita
        ], 200);
    }

    public function addToFavorite(Request $request)
    {
        $idUser = Auth::user()->id_user;
        $pembaca = Pembaca::where('id_user', $idUser)->first();

        $idBerita = $request->input('id_berita');

        $request->validate([
            'id_berita' => 'required|exists:berita,id_berita',
        ]);

        $existingFavorit = Favorit::where('id_pembaca', $pembaca->id_pembaca)
            ->where('id_berita', $idBerita)
            ->first();

        if ($existingFavorit) {
            return response([
                'message' => 'Berita sudah ada di favorit.',
            ], 409);
        }

        $favorit = Favorit::create([
            'id_pembaca' => $pembaca->id_pembaca,
            'id_berita' => $idBerita,
            'tanggal_favorit' => now(), 
        ]);

        return response([
            'message' => 'Berita berhasil ditambahkan ke favorit.',
            'data' => $favorit,
        ], 201); 
    }

    public function checkStatus(Request $request, $idBerita)
    {
        try {
            $idUser = Auth::user()->id_user;
            $pembaca = Pembaca::where('id_user', $idUser)->first();

            if (!$pembaca) {
                return response([
                    'message' => 'Pembaca tidak ditemukan.',
                    'isFavorit' => false,
                ], 404);
            }

            $isFavorit = Favorit::where('id_pembaca', $pembaca->id_pembaca)
                ->where('id_berita', $idBerita)
                ->exists();

            return response([
                'message' => 'Status Favorit Retrieved',
                'isFavorit' => $isFavorit,
            ], 200);
        } catch (Exception $e) {
            return response([
                'message' => 'Gagal memeriksa status favorit.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function show(string $id)
    {
        $favorit = Favorit::find($id);

        if($favorit){
            return response([
                'message' => 'Favorit Found',
                'data' => $favorit
            ],200);
        }

        return response([
            'message' => 'Favorit Not Found',
            'data' => null
        ],404);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
    
        $idBerita = Berita::where('id_berita', $id)->first();

        if (!$idBerita) {
            return response([
                'message' => 'Berita Not Found',
                'data' => null
            ], 404);
        }

        $favorit = Favorit::where('id_berita', $idBerita->id_berita)->first();

        if (!$favorit) {
            return response([
                'message' => 'Favorit Not Found',
                'data' => null
            ], 404);
        }

        if ($favorit->delete()) {
            return response([
                'message' => 'Favorit Deleted Successfully',
                'data' => $favorit,
            ], 200);
        }

        return response([
            'message' => 'Delete Favorit Failed',
            'data' => null,
        ], 400);
    }

}
