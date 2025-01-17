<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Pembaca;
use App\Models\Pegawai;
use App\Mail\MailSend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{
    public function register(Request $request){

        $str = Str::random(100);
        $registrationData = $request->all();

        $validate = Validator::make($registrationData, [
            'nama_lengkap' => 'required|max:70',
            'email' => 'required|email:rfc,dns',
            'username' => 'required|min:4|unique:users,username',
            'password' => 'required|min:6',
            'tanggal_lahir' => 'required|date|before:today',
            'no_telp' => 'required|max:12',
        ]);
        if($validate->fails()){
            return response(['message' => $validate->errors()->first()], 400);
        }

        $registrationData['password'] = bcrypt($request->password);

        $user = User::create([
            'id_role' => 2,
            'nama_lengkap' => $request->nama_lengkap,
            'email'=> $request->email,
            'username'=> $request->username,
            'password' => bcrypt($request->password),
            'tanggal_lahir' => $request->tanggal_lahir,
            'no_telp' => $request->no_telp,
            'verify_key' => $str,
        ]);
        
        $pembaca = Pembaca::create([
            'id_user' => $user->id_user
        ]);

        $details = [
            'Nama Lengkap' => $request->nama_lengkap,
            'website' => 'WinniCode Indonesia',
            'datetime' => date('Y-m-d H:i:s'),
            'url' => request()->getHttpHost() . '/api/verify/' . $str
        ];

        Mail::to($request->email)->send(new MailSend($details));
        Session::flash('message', 'Link verifikasi telah dikirim ke email anda. Silahkan cek email anda untuk mengaktifkan akun.');
        return response([
            'message' => 'Pembaca Added Successfully',
            'data' => $user,
        ], 200);
    }

    public function verify($verify_key)
    {
        $keyCheck = User::select('verify_key')
            ->where('verify_key', $verify_key)
            ->exists();

        if ($keyCheck) {
            $user = User::where('verify_key', $verify_key)
                ->update([
                    'active' => 1,
                    'email_verified_at' => date('Y-m-d H:i:s'),
                ]);
            return "Verifikasi berhasil. Akun anda sudah aktif.";
        } else {
            return "Keys tidak valid.";
        }
    }

    public function registerPegawai(Request $request){
        $str = Str::random(100);
        $registrationData = $request->all();

        $validate = Validator::make($registrationData, [
            'id_role' => 'required',
            'nama_lengkap' => 'required|max:60',
            'email' => 'required|email:rfc,dns',
            'username' => 'required|min:4|unique:users,username',
            'password' => 'required|min:6',
            'tanggal_lahir' => 'required|date|before:today',
            'no_telp' => 'required|max:12',
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()->first()], 400);
        }

        $registrationData['password'] = bcrypt($request->password);

        $user = User::create([
            'id_role' => $request->id_role,
            'nama_lengkap' => $request->nama_lengkap,
            'email' => $request->email,
            'username' => $request->username,
            'password' => $request->password,
            'tanggal_lahir' => $request->tanggal_lahir,
            'no_telp' => $request->no_telp,
            'verify_key' => $str,
            'active' => 1,
        ]);

        // Pewarisan ke pegawai
        $pegawai = Pegawai::create([
            'id_user' => $user->id_user,
        ]);

        $user->status = true;

        return response([
            'message' => 'Pegawai Added Successfully',
            'data' => $user,
        ], 200);
    }

    public function login(Request $request)
    {

        $loginData = $request->all();
        $validate = Validator::make($loginData, [
            'email' => 'required',
            'password' => 'required',
        ]);

        if ($validate->fails()) {
            return response(['message' => $validate->errors()->first()], 400);
        }

        if (!Auth::attempt($loginData)) {
            return response(['message' => 'Invalid email & password match'], 401);
        } else {
            $user = Auth::user();

            if ($user->active == 1) {
                /** @var \App\Models\User $user  **/
                $token = $user->createToken('Authentication Token')->accessToken;

                return $response = [
                    'message' => 'Authenticated',
                    'user' => $user,
                    'token_type' => 'Bearer',
                    'access_token' => $token
                ];
                $response['user'] = $user;
            } else {
                Auth::logout();
                return response([
                    'message' => 'Belom Melakukan Verifikasi Email'
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        return response([
            'message' => 'Logged out'
        ]);
    }
}
