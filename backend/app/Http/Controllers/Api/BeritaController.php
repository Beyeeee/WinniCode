<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\Berita;
use App\Models\User;
use App\Models\Pegawai;
use App\Models\Kategori;

class BeritaController extends Controller
{
    public function index()
    {
        $berita = Berita::inRandomOrder()->get();

        return response([
            'message' => 'All Berita Retrieved',
            'data' => $berita
        ], 200);
    }

    public function search(Request $request)
    {
        $keyword = $request->input('keyword');

        if (empty($keyword)) {
            return response([
                'message' => 'Keyword is required for search',
                'data' => []
            ], 400);
        }

        $berita = Berita::where('judul_berita', 'like', '%' . $keyword . '%')
            ->orWhereHas('kategori', function ($query) use ($keyword) {
                $query->where('nama_kategori', 'like', '%' . $keyword . '%');
            })
            ->get();

        if ($berita->isEmpty()) {
            return response([
                'message' => 'No matching news found',
                'data' => []
            ], 404);
        }

        return response([
            'message' => 'Search results retrieved successfully',
            'data' => $berita
        ], 200);
    }

    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'nama_kategori' => 'required',
            'judul_berita' => 'required',
            'gambar_berita' => 'required|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'nama_penulis' => 'required',
            'tanggal_berita' => 'required|date_format:Y-m-d',
            'isi_berita' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $idUser = Auth::user()->id_user;
        $pegawai = Pegawai::where('id_user', $idUser)->first();
        if (is_null($pegawai)) {
            return response(['message' => 'User Not Found'], 404);
        }

        $kategori = Kategori::where('nama_kategori', $storeData['nama_kategori'])->first();
        if (is_null($kategori)) {
            return response(['message' => 'Kategori Not Found'], 404);
        }

        $uploadFolder = 'gambar';
        $image = $request->file('gambar_berita');
        $image_uploaded_path = $image->store($uploadFolder, 'public');
        $uploadedImageResponse = basename($image_uploaded_path);

        $storeData['gambar_berita'] = $uploadedImageResponse;
        $storeData['id_pegawai'] = $pegawai->id_pegawai; 
        $storeData['id_kategori'] = $kategori->id_kategori; 

        $berita = Berita::create([
            'id_pegawai' => $storeData['id_pegawai'],
            'id_kategori' => $storeData['id_kategori'],
            'judul_berita' => $storeData['judul_berita'],
            'gambar_berita' => $storeData['gambar_berita'],
            'nama_penulis' => $storeData['nama_penulis'],
            'tanggal_berita' => $storeData['tanggal_berita'],
            'isi_berita' => $storeData['isi_berita'],
            'view_berita' => 0
        ]);

        return response([
            'message' => 'Berita Added Successfully',
            'data' => $berita,
        ],200); 
    }

    public function show(string $id)
    {
        $berita = Berita::find($id);

        if($berita){
            
            $berita->increment('view_berita');

            return response([
                'message' => 'Berita Found',
                'data' => $berita
            ],200);
        }

        return response([
            'message' => 'Berita Not Found',
            'data' => null
        ],404);
    }

    public function showByKategori(string $namaKategori)
    {
        $kategori = Kategori::where('nama_kategori', $namaKategori)->first();

        if (is_null($kategori)) {
            return response(['message' => 'Kategori Not Found'], 404);
        }

        $berita = Berita::where('id_kategori', $kategori->id_kategori)->get();

        return response([
            'message' => 'Berita Retrieved by Kategori',
            'data' => $berita
        ], 200);
    }

    public function showTrending()
    {
        
        $beritaTrending = Berita::orderBy('view_berita', 'desc')
            ->take(6) 
            ->get();

        if ($beritaTrending->isEmpty()) {
            return response([
                'message' => 'No trending news available.',
                'data' => [],
            ], 404);
        }

        return response([
            'message' => 'Trending news retrieved successfully.',
            'data' => $beritaTrending,
        ], 200);
    }

    public function showTerkini()
    {
        $terkini = Berita::latest('created_at')->take(5)->get();

        if ($terkini) {
            return response()->json([
                'success' => true,
                'data' => $terkini,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Berita tidak ditemukan',
        ], 404);
    }


    public function update(Request $request, string $id)
    {
        $berita = Berita::find($id);
        if(is_null($berita)){
            return response([
                'message' => 'Berita Not Found',
                'data' => null
            ],404);
        }

        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'nama_kategori' => 'required',
            'judul_berita' => 'required',
            'nama_penulis' => 'required',
            'tanggal_berita' => 'required|date_format:Y-m-d',
            'isi_berita' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $berita->update($updateData);

        return response([
            'message' => 'Berita Updated Successfully',
            'data' => $berita,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $berita = Berita::find($id);

        if(is_null($berita)){
            return response([
                'message' => 'Berita Not Found',
                'data' => null
            ],404);
        }

        if($berita->delete()){
            return response([
                'message' => 'Berita Deleted Successfully',
                'data' => $berita,
            ],200);
        }

        return response([
            'message' => 'Delete Berita Failed',
            'data' => null,
        ],400);
    }
}
