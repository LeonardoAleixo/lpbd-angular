import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {

  constructor(private httpClient: HttpClient, private utilService: UtilService) { }
  
  /*
  * Alterado LPBD - Julio Rangel - 18/05/2019 
  * Método aplicado para enviar GET para o WebService 
  * com basic auth para consumo de REST do Java
  * Metodo para buscar um usuario a partir do ID
  */
  buscarPorId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.utilService.getApiServer() + `user/get/id/` + id + "/", this.utilService.buildHeaders());
  }

  /*
  * Alterado LPBD - Julio Rangel - 18/05/2019 
  * Método aplicado para enviar GET para o WebService 
  * com basic auth para consumo de REST do Java
  * Metodo para buscar todos os usuarios do banco
  */
  buscarTodos(): Observable<any> {
    return this.httpClient.get<any>(this.utilService.getApiServer() + 'user/get/all/', this.utilService.buildHeaders());
  }

  /*
  * Alterado LPBD - Renato Júnior - 14/05/2019 
  * Método aplicado para enviar POST para o WebService 
  * com basic auth para consumo de REST do Java
  */
  salvar(user: any): Observable<any> {
    return this.httpClient.post<any>(this.utilService.getApiServer() + `user/save/`, user, 
    this.utilService.buildHeaders());
  }

}
