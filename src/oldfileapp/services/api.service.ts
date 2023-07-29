import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers, meData } from '../operations/query';
import { map } from 'rxjs/operators';
import { RegisterData } from '../components/register/register.interface';
import { registerData, login } from '../operations/mutation';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo: Apollo) { }


  // Lista de usuarios
  getUsers() {
    return this.apollo
    .watchQuery(
      {
        query: getUsers,
        fetchPolicy: 'network-only',
        context: {
          headers: new HttpHeaders({
            authorization: 'Bearer ' + localStorage.getItem('tokenJWT')
          })
        }
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.users;
    }));
  }

// Login
/*   login(email: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          email,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      return result.data.login;
    }));
  } */


  login(username: string, password: string) {
    return this.apollo
      .mutate({
        mutation: login,
        variables: {
          username,
          password
        }
      }).pipe(map(result => {
      console.log(result.data.login);
      // return result.data;
     return result.data.login;
    }));
  }  

  // Login
/* login(username: string, password: string) {
    return this.apollo
    .watchQuery(
      {
        query: login,
        variables: {
          username,
          password
        },
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(map((result: any) => {
      console.log(result.data.login);
      // return result.data;
     return result.data.login;
    }));
  }  */

  register(user: RegisterData) {
    return this.apollo
      .mutate({
        mutation: registerData,
        variables: {
          user
        }
      });
  }
}
