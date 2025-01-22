<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

use App\Models\User;
use App\Models\Pegawai;
use App\Models\Role;

class PegawaiController extends Controller
{
    public function getPegawai()
    {
        // Ambil semua pegawai selain role 2 dan 3
        $user = User::whereNotIn('id_role', [2, 3])->with('role')->get();

        return response([
            'message' => 'All Pegawai Retrieved',
            'data' => $user,
        ], 200);
    }

    public function editRolePegawai(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'nama_role' => 'required|exists:role,nama_role', 
        ]);

        if ($validator->fails()) {
            return response([
                'message' => 'Validation Error',
                'errors' => $validator->errors(),
            ], 400);
        }

        try {
            $pegawai = User::find($id);

            if (!$pegawai) {
                return response([
                    'message' => 'Pegawai Not Found',
                    'data' => null,
                ], 404);
            }

            $role = Role::where('nama_role', $request->nama_role)->first();

            if (!$role) {
                return response([
                    'message' => 'Role Not Found',
                    'data' => null,
                ], 404);
            }

            $pegawai->id_role = $role->id_role;

            if ($pegawai->save()) {
                return response([
                    'message' => 'Role Updated Successfully',
                    'data' => $pegawai,
                ], 200);
            }

            return response([
                'message' => 'Role Update Failed',
                'data' => null,
            ], 400);

        } catch (Exception $e) {
            return response([
                'message' => 'An Error Occurred',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy(string $id)
    {
        $pegawai = User::find($id);

        if(is_null($pegawai)){
            return response([
                'message' => 'Pegawai Not Found',
                'data' => null
            ],404);
        }

        if($pegawai->delete()){
            return response([
                'message' => 'Pegawai Deleted Successfully',
                'data' => $pegawai,
            ],200);
        }

        return response([
            'message' => 'Delete Pegawai Failed',
            'data' => null,
        ],400);
    }
}