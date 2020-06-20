import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  constructor(private httpClient: HttpClient, private utilService: UtilService) { }
  
  
  buscarPorId(id: number): Observable<any> {
    return this.httpClient.get<any>(this.utilService.getApiServer() + `tarefa/get/id/` + id + "/", this.utilService.buildHeaders());
  }

  buscarPorIdUser(id: number): Observable<any> {
    return this.httpClient.get<any>(this.utilService.getApiServer() + `tarefa/get/id/user/` + id + "/", this.utilService.buildHeaders());
  }

  buscarTodos(): Observable<any> {
    return this.httpClient.get<any>(this.utilService.getApiServer() + 'tarefa/get/all/', this.utilService.buildHeaders());
  }

  salvar(tarefa: any): Observable<any> {
    return this.httpClient.post<any>(this.utilService.getApiServer() + `tarefa/save/`, tarefa, 
    this.utilService.buildHeaders());
  }

  validarDados(obj):any{
    if (obj.titulo != null && obj.titulo != ""){
      if (obj.dataInicio != null && obj.dataInicio != undefined){
        if (obj.dataFim != null && obj.dataFim != undefined){
          if(obj.dataPrevistaFim != null && obj.dataPrevistaFim != undefined){
            if (obj.importancia != null && obj.importancia != 0){
              return "ok";
            }else{
              return "Importância não preenchida";
            }
          }else{
            return "Data de previsão fim não preenchida";
          }
        }else{
          return "Data de fim não preenchida";
        }
      }else{
        return "Data de início não preenchida";
      }
    }else{
      return "Título não preenchido";
    }
  }

}
