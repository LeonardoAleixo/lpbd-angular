import { Component, OnInit } from '@angular/core';
import { CadastroUsuarioService } from '../services/cadastro-usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
  listaUsuario:any = [];
  usuario:any;
  mostrarLista:boolean = true;
  constructor(private cadastroUsuarioService:CadastroUsuarioService) {
    this.buscarTodos();
   }

  ngOnInit(): void {
  }

  buscarTodos(){
    this.cadastroUsuarioService.buscarTodos().subscribe((retorno: any) => {
      this.usuario = null;
      this.listaUsuario = retorno;
      this.mostrarLista = true;
    });
  }

  criarNovo(){
    this.usuario = this.buildUsuario();
    this.mostrarLista = false;
  }

  buildUsuario(){
    let usuario  = {
      id : null,
      nome:"",
      sobrenome:"",
      dataNascimento:null,
      cpf:"",
      telefone:""
    }
    return usuario;
  }

  buscarPorId(index:number){
    this.cadastroUsuarioService.buscarPorId(this.listaUsuario[index].id).subscribe((retorno: any) => {
      this.usuario = retorno;
      this.mostrarLista = false;
    });
  }

  salvar(){
    if ((this.usuario.dataNascimento + "").indexOf("-") != -1){
      let dataL = this.usuario.dataNascimento.split("-");
      let data = new Date(dataL[0], dataL[1], dataL[2]); 
      this.usuario.dataNascimento = data.getTime();
    }
    this.cadastroUsuarioService.salvar(this.usuario).subscribe((retorno: any) => {
      this.buscarTodos();
    }, error =>{
      alert(JSON.stringify(error.error))
    }
    )
  }

}
