import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map} from "rxjs/operators"
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) { 
   return this.http.post('/api/authenticate', 
      JSON.stringify(credentials)).pipe(
        map((res:any) => 
          {           
            if(res && res.json().token)
            {
              localStorage.setItem("token",res.json().token);
              return true;
            }            
            return false;           
          })
      );
  }

  logout() {
    localStorage.removeItem("token"); 
  }

  isLoggedIn() { 

    let jwtHelper= new JwtHelperService();
    let token=localStorage.getItem("token");
    
    if(!token )
    return false;
    let expirydate=jwtHelper.getTokenExpirationDate(token);
    let isNotExpired=jwtHelper.isTokenExpired(token);
    return isNotExpired;
  }

  getCurrentUser()
  {  
    let token=localStorage.getItem("token");   
     
    if(!token )
      return null;

    return new JwtHelperService().decodeToken(token);
  }

}

