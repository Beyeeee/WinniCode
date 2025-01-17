<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Pembaca extends User
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pembaca';
    protected $primaryKey = 'id_pembaca';
    protected $fillable = [
        'id_user'
    ];

    public function favorit(){
        return $this->hasMany(Favorit::class);
    }

    public function komentar(){
        return $this->hasMany(Komentar::class);
    }

}
