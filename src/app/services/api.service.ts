import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  rutaBase: string = 'https://fer-sepulveda.cl/API_CLASE/api-service.php'

constructor(private http: HttpClient) { }

PersonaAlmacenar(rut, nombre, apellido, sueldo) {
  let that = this;

  return new Promise(resolve => {
    resolve(that.http.post(that.rutaBase, {
      nombreFuncion: "PersonaAlmacenar",
      parametros: [rut, nombre, apellido, sueldo]
    }).toPromise())
  })
}

PersonaListar() {
  let that = this;

  return new Promise(resolve => {
    resolve(that.http.get(that.rutaBase 
      + '?nombreFuncion=PersonaListar').toPromise())
  })
}
}
