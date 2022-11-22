import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  validador: boolean = false;
  lista_personas = [];
  passreult: string ='';


  constructor(private router: Router, private sqlite: SQLite) {
    // SE CREA LA BASE DE DATOS
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS USER(EMAIL VARCHAR(30), ' 
        + 'NOMBRE VARCHAR(30), APELLIDO VARCHAR(30), ' 
        + 'PASS VARCHAR(30))', []).then(() => {
          console.log('Base de datos OK');
        })
    });
  }

  almacenarPersona(email, nombre, apellido, pass) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO USER VALUES(?, ?, ?, ?)', 
      [email, nombre, apellido, pass]).then(() => {
          console.log('Base de datos OK');
          return true;
          

        })
    });
  }

  listarPersonas() {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT EMAIL, NOMBRE, APELLIDO, PASS ' 
        + ' FROM USER', []).then((data) => {
          return data;
        })
    });
  }

  buscarPersonas(email) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT EMAIL, NOMBRE, APELLIDO, PASS ' 
        + ' FROM USER WHERE NOMBRE LIKE ?', [email + '%']).then((data) => {
          return data;
        })
    });
  }

  eliminarPersona(email) {
    this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM USER WHERE EMAIL = ?', 
      [email]).then(() => {
          console.log('FSR: Persona eliminada correctamente');
        })
    });
  }

  validarCredenciales(user, pass, new_pass) {
    if(user == 'a' && pass == new_pass ) {
      this.validador = true;
      this.router.navigate(['pagina-dos']);
      return true;
    } else {
      return false;
    }
  }
  validasesion(nombre) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT EMAIL, NOMBRE, APELLIDO, PASS ' 
        + ' FROM PERSONA WHERE NOMBRE LIKE ?', [nombre + '%']).then((data) => {
          return data;
        })
    });
  }

  buscaruser(email,mdl_pass) {
    return this.sqlite.create({
      name: "datos.db",
      iosDatabaseLocation: "default"
    }).then((db: SQLiteObject) => {
      return db.executeSql('SELECT PASS ' 
        + ' FROM USER WHERE EMAIL LIKE ?', [email]).then((data) => {
          this.passreult = data.rows.item(0).PASS;
          console.log('el pepe '+mdl_pass)
          console.log('el yorsh'+this.passreult)
          if(this.passreult === mdl_pass){
            console.log('el pepe entro');
            this.validador = true;
            return true;}else{
              this.validador = false;
              return false;
            }})
    });
  }
  canActivate(){
    if(this.validador) {
      return true;
    } else {
      return false;
    }
  }
}