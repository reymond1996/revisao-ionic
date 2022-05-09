import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  server: string = "http://localhost/appAccessRevisao/";

  constructor(private http: HttpClient) { }
  dadosApi(dados: any, nomeApi: string) {
    const httOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    let url = this.server + nomeApi;
    return this.http.post(url, JSON.stringify(dados), httOptions).map(res => res)
  }
}
//comando para tira o erro do map
//npm install rxjs-compat