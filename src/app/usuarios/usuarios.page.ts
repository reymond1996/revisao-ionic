import { PostService } from './../../services/post.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {
  nome: string = "";
  limite: number = 10;
  inicial: number = 0;
  usuarios: any = [];// defini uma matriz vazia
  constructor(// inicio das declarações
    private router: Router,
    private service: PostService,
    private toastCtrl: ToastController,
    private AlertCtrl: AlertController
    //fim das declarações
  ) { }


  ngOnInit() {
    /*Use este bloco para testar os formularios e rotas*/
    // let user = {
    //   id: '100',
    //   nome: "Edson",
    //   usuario: "Edson",
    //   senha_original: "123456",
    //   nivel: "admin"

    // };
    // this.usuarios.push(user);
  }
  ionViewWillEnter() {
    // garante que a nossa tela sempre exiba dados atualizados

    this.usuarios = [];
    this.inicial = 0;
    this.carregar();
  }
  addUsuario() {
    this.router.navigate(['add-usuario']);
  }// final do método addUsuarios
  carregar() {
    return new Promise(ret => {
      this.usuarios = [];
      let dados = {
        requisicao: "listar",
        nome: this.nome,
        limit: this.limite,
        start: this.inicial
      };
      this.service.dadosApi(dados, 'app.php').subscribe(data => {
        if (data['result'] == '0') {
          this.ionViewWillEnter();
        }
        else {
          for (let usuario of data['result']) {
            this.usuarios.push(usuario);
          }
        }
        ret(true)
      });
    });
  }//final do método carregar()

  mostrar(id, nome, usuario, nivel) {
    this.router.navigate(['mostrar-usuario/' + id + '/' + nome + '/' + usuario + '/' + nivel]);
  }//final do método mostrar()

  editar(id, nome, usuario, senha, nivel) {
    this.router.navigate(['add-usuario/' + id + '/' + nome + '/' + usuario + '/' + senha + '/' + nivel]);

  }//final do método editar()

  excluir(id) {
    return new Promise(() => {
      let dados = {
        requisicao: 'excluir',
        id: id
      };
      this.service.dadosApi(dados, 'app.php').subscribe(async data => {
        if (data['success']) {
          const toast = await this.toastCtrl.create({
            message: data['msg'],
            duration: 2000,
            position: 'middle',
            color: 'danger'
          });
          toast.present()
        }
        this.ionViewWillEnter();
        //data
      });
    });
  }//final do método excluir()
  async alertarExclusao(id, usuario) {
    const alert = await this.AlertCtrl.create({
      header: 'Confirmação Exclusão do usuario ' + usuario,
      buttons: [{
        text: 'Cancelar', role: 'cancel', cssClass: 'ligth',
        handler: () => {
          // caso o usuário clique em cancelar
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.excluir(id);
        }
      }]


    });
    alert.present();
  }
  ativar(id, ativo) {
    if (ativo == '1') ativo = '0';
    else ativo = "1";
    return new Promise(() => {
      let dados = {
        requisicao: 'ativar',
        id: id,
        ativo: ativo
      };
      this.service.dadosApi(dados, 'app.php').subscribe(async data => {
        if (data['success']) {

        }
        this.ionViewWillEnter();
        //data
      });
    });
  }// fim do m-edoto ativar
}
