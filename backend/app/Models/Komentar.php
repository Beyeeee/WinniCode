<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Komentar extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'Komentar';
    protected $primaryKey = 'id_komentar';
    protected $fillable = [
        'id_pembaca',
        'id_berita',
        'nama_pengomentar',
        'tanggal_komentar',
        'isi_komentar',
    ];

    public function pembaca(){
        return $this->belongsTo(Pembaca::class, 'id_pembaca');
    }

    public function berita(){
        return $this->belongsTo(Berita::class, 'id_berita');
    }
}
