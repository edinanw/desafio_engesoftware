import { AuthService } from './../auth.service';
import { map, catchError } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { throwError, of } from 'rxjs';
import { isUndefined } from 'util';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  public nome;
  public email;
  public senha;
  public c_senha;
  private resp;
  constructor(private httpC: HttpClient, private router: Router, private authservice: AuthService) { }

  ngOnInit() {}

  cadastrar(){
    var headers =  new HttpHeaders({ 
      'Content-Type': 'text/plain'
    });

    var dados = {"name":this.nome,"email":this.email,"password":this.senha,"c_password": this.c_senha};
    this.httpC.post('http://localhost:8000/api/register',dados, { observe: 'response', headers:headers}).subscribe(
      (data)=>{
        this.resp=data.body;
        if (!isUndefined(this.resp.success)) {
          console.log(this.resp.success);
          this.authservice.setToken(this.resp.success.token);          

          alert("Usuário cadastrado com sucesso");

          this.router.navigate(['/']);

        }else{
          console.log(data);
          alert('Erro ao efetuar a operação');
        }
      },(err)=>{
          
          console.log(err);
          if(err.error.message){
            alert(err.error.message);
          }else{
            alert('Erro ao efetuar a operação');
          }

        
      });
  }

}
