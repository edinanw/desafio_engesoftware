import { AuthService } from './../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public contatos;
  public filtro;

  constructor(private http: HttpClient,private auth:AuthService) { 
    this.getContatos();

  }
  
  ngOnInit() {
  }

  getContatos(){
    var headers =  new HttpHeaders({      
      'Accept': 'application/json'
    });
    const token=this.auth.getToken();
    this.http.get('http://localhost:8000/api/contato',{observe: 'response',headers:headers}).subscribe((data)=>{
      this.contatos=data.body;
    },(err)=>{       
      console.log(err);
    });
  } 

}
