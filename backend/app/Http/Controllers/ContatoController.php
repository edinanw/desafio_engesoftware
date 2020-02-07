<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Contato;
use Illuminate\Support\Facades\Auth; 
use Validator;

class ContatoController extends Controller{

    public function __construct(){
		header('Access-Control-Allow-Origin: *');
		header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, HEAD');		
    }

    public function index(){
        
         $cont=Contato::all();
         if(!$cont){             
             return response()->json(["error"=>"Nenhum Contato Cadastrado!"],400);
            }
            return response()->json([$cont],200);
        
    }
        
    public function show($id){
        if (!$id) {            
            return response()->json(["error"=>"Registro Invalido!!"],400);
        }
        
        $cont=Contato::find($id);
        return response()->json([$cont],200);
        
    }  

    public function store(Request $req){
		$data=json_decode($request->getContent(),1);
        $validator = Validator::make($data,[ 
            'nome' => 'required',
            'email' => 'required|email',
            'telefone' => 'required',  
            'empresa' => 'required',
        ]);   
        
        if ($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 400);                        
        }
        $cont= new Contato;
        $cont->nome = $data['nome'];
        $cont->telefone = $data['telefone'];
        $cont->email = $data['email'];
        $cont->empresa = $data['empresa'];
        if($cont->save()){
            return $cont;
        }

        throw new HttpException(400, "Registro Não Incluído!");
    }
    
    public function update(Request $req, $id){
        if (!$id) {
            return response()->json(['error'=>"Registro inválido!"], 400);                        
        }
		$data=json_decode($request->getContent(),1);
        $validator = Validator::make($data,[ 
            'nome' => 'required',
            'email' => 'required|email',
            'telefone' => 'required',  
            'empresa' => 'required',
        ]);   
        
        if ($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 400);                        
        }

        
        $cont=Contato::find($id);
        $cont->nome = $data['nome'];
        $cont->telefone = $data['telefone'];
        $cont->email = $data['email'];
        $cont->empresa = $data['empresa'];
        if($cont->save()){
            return $cont;
        }
        return response()->json(['error'=>"Registro Não Alterado!"], 400); 
        
    }
    
    public function delete($id){
        if (!$id) {
            return response()->json(['error'=>"Registro Invalido!"], 400); 
        }
        $cont= Contato::find($id);
        
        if($cont->delete()){
            return response()->json([
                'message'=>'Registro excluído com sucesso!'
                ]);
            }
            return response()->json(['error'=>"Registro Não Alterado!"], 400); 
        
    }
}
