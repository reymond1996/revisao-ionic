import { ToastController } from '@ionic/angular';
import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: String = "";
  senha: string = "";
  constructor(
    private router: Router,
    private sevice: PostService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
  }
  login() {
    let dados = {
      requisicao: 'login',
      usuario: this.usuario,
      senha: this.senha
    }
    //dados e o que esta sendo passadp para a api
    // data é o que esta sendo retornado pela api
    this.sevice.dadosApi(dados, 'app.php').subscribe(async data => {
      if (data['success']) {
        if (data['result']['nivel'] == 'admin' || data['result']['nivel'] == 'professor')
          //console.log(data['result']);
          this.router.navigate(['usuarios']);
        else
          this.router.navigate(['folder']);
        const toast = await this.toastCtrl.create({
          message: 'Login efetuado com sucesso',
          position: 'bottom',
          color: 'success',
          duration: 2500
        });
        toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: data['msg'],
          position: 'top',
          color: 'danger',
          duration: 2500
        });
        toast.present();
      }

    });
  }
}
