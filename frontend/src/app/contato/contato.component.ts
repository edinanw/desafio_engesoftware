import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  public contatos=[];
  public filtro;

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
  }

  getContatos(){
     this.http.get('http://localhost:8000/contato',{observe: 'response'}).subscribe((data)=>{
       this.contatos=data.body;
     });
  } 

}
