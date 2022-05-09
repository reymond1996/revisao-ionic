import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.page.html',
  styleUrls: ['./mostrar-usuario.page.scss'],
})
export class MostrarUsuarioPage implements OnInit {
  id: string = "";
  nome: string = "";
  usuario: string = "";
  nivel: string = "";
  constructor(private actRouter: ActivatedRoute) { }

  ngOnInit() {
    this.actRouter.params.subscribe((dadosdarota: any) => {
      this.id = dadosdarota.id;
      this.nome = dadosdarota.nome;
      this.usuario = dadosdarota.usuario;
      this.nivel = dadosdarota.nivel;
    });
  }

}
