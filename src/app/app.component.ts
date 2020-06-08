import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lpbd-front';
  constructor(private router:Router){
    this.irParaCadastroUsuario();
  }

  irParaCadastroUsuario(){
    this.router.navigate(['cadastro-usuario']);
  }
}
