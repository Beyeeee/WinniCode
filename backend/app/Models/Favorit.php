<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorit extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'favorit';
    protected $primaryKey = 'id_favorit';
    protected $fillable = [
        'id_pembaca',
        'id_berita',
        'tanggal_favorit'
    ];

    public function pembaca(){
        return $this->belongsTo(Pembaca::class, 'id_pembaca');
    }

    public function berita(){
        return $this->belongsTo(Berita::class, 'id_berita');
    }
}
