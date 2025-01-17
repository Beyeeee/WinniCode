<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $role = Role::inRandomOrder()->get();

        return response([
            'message' => 'All Role Retrieved',
            'data' => $role
        ], 200);
    }

    public function store(Request $request)
    {
        $storeData = $request->all();

        $validate = Validator::make($storeData,[
            'nama_role' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $role = Role::create($storeData);

        return response([
            'message' => 'Role Added Successfully',
            'data' => $role,
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $role = Role::find($id);

        if($role){
            return response([
                'message' => 'Role Found',
                'data' => $role
            ],200);
        }

        return response([
            'message' => 'Role Not Found',
            'data' => null
        ],404);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $role = Role::find($id);
        if(is_null($role)){
            return response([
                'message' => 'Role Not Found',
                'data' => null
            ],404);
        }

        $updateData = $request->all();

        $validate = Validator::make($updateData,[
            'nama_role' => 'required',
        ]);
        if ($validate->fails()) {
            return response(['message'=> $validate->errors()],400);
        }

        $role->update($updateData);

        return response([
            'message' => 'Role Updated Successfully',
            'data' => $role,
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);

        if(is_null($role)){
            return response([
                'message' => 'Role Not Found',
                'data' => null
            ],404);
        }

        if($role->delete()){
            return response([
                'message' => 'Role Deleted Successfully',
                'data' => $role,
            ],200);
        }

        return response([
            'message' => 'Delete Role Failed',
            'data' => null,
        ],400);
    }
}
