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

    public function __construct(){
        header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: *');		
    }

    public function register(Request $request) {    
        $data=json_decode($request->getContent(),1);
        $chk=User::where('email',$data['email'])->count();
        
        if($chk>0){            
            return response()->json(['error'=>true,"message"=>"Email já cadastrado!"], 400);                        
        }
        //var_dump($data);
        $validator = Validator::make($data,[ 
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',  
            'c_password' => 'required|same:password',
        ]);   

        if ($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 401);                        
        }

        $data['password'] = bcrypt($data['password']);
        $user = User::create($data); 
        $success['token'] =  $user->createToken('auth')->accessToken;
        return response()->json(['success'=>$success], $this->ok); 
    }

    public function login(Request $request){
		$data=json_decode($request->getContent());
        if(Auth::attempt(['email' => $data->email, 'password' => $data->password])){
            $user = Auth::user();             
            
            $success['token'] =  $user->createToken('auth')-> accessToken; 
            return response()->json(['success' => $success], $this->ok); 
        } else{ 
            return response()->json(['error'=>'Usu?rio ou senha incorreto',$data], 401); 
        } 
    }
  
    public function token() {
        $user = Auth::user();
        var_dump($user);
        return response()->json(['success' => $user], $this->ok); 
    }



} 