import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { AppComponent } from './app.component';
import { TarefaComponent } from './tarefa/tarefa.component';


const routes: Routes = [
  /*
  * Alterado LPBD - Sandro Toline - 18/05/2019 
  * Dados para redirecionamento para o component de CadastroUsuario
  */
  {path:'', component: CadastroUsuarioComponent },
  {path:'cadastro-usuario', component: CadastroUsuarioComponent },
  {path:'tarefa', component: TarefaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
