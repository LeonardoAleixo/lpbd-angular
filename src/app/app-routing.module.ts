import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';


const routes: Routes = [
  /*
  * Alterado LPBD - Sandro Toline - 18/05/2019 
  * Dados para redirecionamento para o component de CadastroUsuario
  */
  {path:'cadastro-usuario', component: CadastroUsuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
