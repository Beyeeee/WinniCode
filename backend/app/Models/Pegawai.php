<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Pegawai extends User
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pegawai';
    protected $primaryKey = 'id_pegawai';
    protected $fillable = [
        'id_user',
    ];

    public function iklan(){
        return $this->hasMany(Iklan::class);
    }
}
