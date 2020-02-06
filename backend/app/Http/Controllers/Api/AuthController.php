<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth; 
use Validator;

class AuthController extends Controller {

    private $ok = 200;
    private $unauth = 401;
    private $error = 400;

    public function register(Request $request) {    
        $validator = Validator::make($request->all(),[ 
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',  
            'c_password' => 'required|same:password',
        ]);   

        if ($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);                        
        }

        $input = $request->all();  
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input); 
        $success['token'] =  $user->createToken('auth')->accessToken;
        return response()->json(['success'=>$success], $this->ok); 
    }


    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();             
            
            $success['token'] =  $user->createToken('auth')-> accessToken; 
            return response()->json(['success' => $success], $this->ok); 
        } else{ 
            return response()->json(['error'=>'Unauthenticated'], 401); 
        } 
    }
  
    public function user() {
        $user = Auth::user();
       /* if(!$user){
            return response()->json(['error' => 'Usuário não logado'], $this->unauth,[],JSON_PRETTY_PRINT); 
        }*/
        return response()->json(['success' => $user], $this->ok); 
    }
} 