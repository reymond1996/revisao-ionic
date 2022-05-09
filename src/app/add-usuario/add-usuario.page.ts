import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {
  id: string = "";
  nome: string = "";
  senha: string = "";
  usuario: string = "";
  nivel: string = "";

  constructor(
    private service: PostService,
    private router: Router,
    private actRouter: ActivatedRoute
  ) { }
  // carregar pela primeira 1 vez esta página

  ngOnInit() {
    this.actRouter.params.subscribe((dadosdarota: any) => {
      this.id = dadosdarota.id;
      this.nome = dadosdarota.nome;
      this.usuario = dadosdarota.usuaio;
      this.senha = dadosdarota.senha;
      this.nivel = dadosdarota.nivel;
    });
  } // final do noOnInit
  cadastrar() {
    return new Promise(resolve => {
      let dados = {
        requisicao: 'add',
        nome: this.nome,
        usuario: this.usuario,
        senha: this.senha,
        nivel: this.nivel
      };
      this.service.dadosApi(dados, 'app.php').subscribe(data => {
        if (data['success']) {
          this.router.navigate(['usuarios']);
          console.log(data);
          this.id = ""; this.nome = ""; this.senha = ""; this.nivel = ""; this.usuario = "";
        }

      });

    });
  }//final do metodo cadastrar

  editar() {
    return new Promise(() => {
      let dados = {
        requisicao: 'editar',
        nome: this.nome,
        usuario: this.usuario,
        senha: this.senha,
        nivel: this.nivel,
        id: this.id
      };
      this.service.dadosApi(dados, 'app.php').subscribe(data => {
        if (data['success']) {
          this.router.navigate(['usuarios']);
        }

      });
    });
  }// final do metodo editar

}
