import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;

  constructor(private router: Router, private sqlite: SQLite) {
    this.sqlite.create({
      name: 'datos.db'
    }).then((db: SQLiteObject) => {
      console.log('BASE DE DATOS OK');
      //SE CREA LA TABLA
      db.executeSql("CREATE TABLE IF NOT EXISTS PERSONA(RUT VARCHAR(12),"
      + "NOMBRE VARCHAR(20), APELLIDO VARCHAR(20)," + "SUELDO INTEGER", []).then(() =>{
        console.log('Tabla Persona Creada Correctamente');
      })
    })
  }

  almacenarPersona(rut, nombre, apellido, sueldo) {
    this.sqlite.create({
      name: "datos.db"
    }).then((db: SQLiteObject) => {
      db.executeSql("INSERT INTO PERSONA VALUES(?,?,?,?)", [rut, nombre, apellido, sueldo]).then(() =>{
        console.log('Persona almacenada correctamente');
      })
    })
  }
  
  listarPersonas() {
    return this.sqlite.create({
      name: "datos.db"
    }).then((db: SQLiteObject) => {
      return db.executeSql("SELECT RUT, NOMBRE, APELLIDO, SUELDO FROM PERSONA", []).then((data) =>{
        return data;
      })
    })
  }

  buscarPersonas(nombre) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT RUT, NOMBRE, APELLIDO, SUELDO ' 
        + ' FROM PERSONA WHERE NOMBRE LIKE ?', [nombre + '%']).then((data) => {
          return data;
        })
    });
  }

  eliminarPersona(rut) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM PERSONA WHERE RUT = ?', 
      [rut]).then(() => {
          console.log('FSR: Persona eliminada correctamente');
        })
    });
  }

  canActivate(){
    if(this.validador) {
      return true;
    } else {
      this.router.navigate(['pagina-uno']);
      return false;
    }
  }

  validarCredenciales(user, pass, new_pass) {
    if(user == 'estudiante' && pass == new_pass ) {
      this.validador = true;
      this.router.navigate(['pagina-dos']);
      return true;
    } else {
      return false;
    }
  }
}
