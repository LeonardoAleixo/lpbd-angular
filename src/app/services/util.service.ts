import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/*
* Alterado LPBD - Douglas Nishiama - 14/05/2019 
* Arquivo criado para armazenar informações gerais e buildHeader
* do basic auth para consumo de REST do Webservice Java
*/
export class UtilService {
  API_SERVER = "http://localhost:8080/lpbd/";
  //API_SERVER = "http://165.227.207.38:8080/lpbd/";

  constructor() { }


  buildHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("Aleixo:DataType@123"));
    let httpOption = {
      headers: headers
    }
    return httpOption;
  }


  getApiServer() {
    return this.API_SERVER;
  }
}
