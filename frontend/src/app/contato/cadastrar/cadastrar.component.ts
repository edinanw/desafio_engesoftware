import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  public nome: String="";
  public email: String="";
  public telefone="";
  public empresa="";
  private resp;

  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }

  salvar(){
    if(this.nome.trim()==""){
      alert('preencha o nome');
    }else if(this.telefone.trim()==""){
      alert('preencha o telefone');
    }else if(this.email.trim()==""){
      alert('preencha o email');
    }else if(this.empresa.trim()==""){
      alert('preencha a empresa');
    }else{
      const dados={
        "nome":this.nome,
        "email":this.email,
        "telefone":this.telefone,
        "empresa":this.empresa,
      };
      
      var headers =  new HttpHeaders({
        'Content-Type': 'text/plain'
      });

      this.http.post('http://localhost:8000/api/contato',dados,{ observe: 'response', headers:headers}).subscribe(data=>{
        this.resp=data.body;
        if(this.resp.success){
          alert('Contato incluído com sucesso');
          this.router.navigate(['/contato']);
        }else if(this.resp.error){
          alert(this.resp.error.message);
          console.log(this.resp.error);
        }else{
          alert("Erro ao efetuar a operação")
        }

      },err=>{
        this.resp=err;
        if(this.resp.error.message){
          alert(this.resp.error.message);
        }else{
          alert("Erro ao efetuar a operação");
          
        }
        console.log(err);
      })
    }
  }

}
