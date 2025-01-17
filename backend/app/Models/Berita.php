<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'berita';
    protected $primaryKey = 'id_berita';
    protected $fillable = [
        'id_pegawai',
        'id_kategori',
        'judul_berita',
        'gambar_berita',
        'nama_penulis', 
        'tanggal_berita',
        'isi_berita',
        'view_berita'
    ];

    public function pegawai(){
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }

    public function kategori(){
        return $this->belongsTo(Kategori::class, 'id_kategori');
    }
}
