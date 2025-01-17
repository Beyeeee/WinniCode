<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Iklan extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'iklan';
    protected $primaryKey = 'id_iklan';
    protected $fillable = [
        'id_pegawai',
        'nama_iklan',
        'gambar_iklan',
        'link_iklan',
    ];

    public function pegawai(){
        return $this->belongsTo(Pegawai::class, 'id_pegawai');
    }
}
