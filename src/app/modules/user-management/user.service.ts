import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from 'src/app/core/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private baseService : BaseService ) { }
    // public methods
    getUsers(): Observable<any> {
     // return this.baseService.getViaParam('/users/all', '');
     return of(
       [
        {
          id: 1,
          username: 'admin',
          email: 'admin@demo.com',
          name: 'Sean',
          phone: '456669067890',
          status: 'Active'
        },
        {
          id: 2,
          username: 'user',
          email: 'user@demo.com',
          name: 'Megan',
          phone: '456669067891',
          status: 'Active'
        },
        {
          id: 3,
          username: 'guest',
          email: 'guest@demo.com',
          name: 'Ginobili Maccari',
          phone: '456669067892',
          status: 'Pending'
        }
       ]
     );
    }
  
    // public methods
    saveUsers(users): Observable<any> {
      //return this.baseService.postViaObjectParam('/users/update', users);
      return of( {
        status:'success'
      });
    }
  
    // public methods
    deleteUsers(users): Observable<any> {
      return this.baseService.postViaObjectParam('/users/delete', users);
    }
}
