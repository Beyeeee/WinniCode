<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'kategori';
    protected $primaryKey = 'id_kategori';
    protected $fillable = [
        'nama_kategori',
        'icon_kategori'
    ];

    public function berita(){
        return $this->hasMany(Berita::class);
    }
}
