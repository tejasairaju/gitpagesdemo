import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import { map } from "rxjs/operators";



@Injectable()
export class OrderService {

  constructor(private http: Http) {
  }

  getOrders() { 
    let header=new Headers();
    let token=localStorage.getItem('token');
    header.append("Authorization", "Bearer "+ token)

    let options = new RequestOptions({headers :header})
    return this.http.get('/api/orders',options).pipe(
      map(res =>res.json())
    )      
  }
}
