import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _httpClient:HttpClient) { }

  private baseUrl:String="/api/v1/customers";

  fetchAllCustomers():Observable<Customer[]>{
    return this._httpClient.get<Customer[]>(`${this.baseUrl}`);
  }

  createCustomers(data:Customer){
    return this._httpClient.post<Customer>(`${this.baseUrl}`,data);
  }

  updateCustomers(data:Customer){
    return this._httpClient.put<Customer>(`${this.baseUrl}/${data.id}`,data);
  }

  deleteCustomers(id:Number){
    return this._httpClient.delete<Customer>(`${this.baseUrl}/${id}`);
  }
}