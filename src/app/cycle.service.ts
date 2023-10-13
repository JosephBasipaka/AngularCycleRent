import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cycles } from './cycles';

@Injectable({
  providedIn: 'root'
})
export class CycleService {
  private apiUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('idtoken')
    });
  }

  getCycles(): Observable<Cycles[]> {
    const url = `${this.apiUrl}/cycle/list`;
    return this.http.get<Cycles[]>(url);
  }

  // restockCycle(id: number, count: number): Observable<Cycles[]> {
  //   const url = `${this.apiUrl}/${id}/restock?count=${count}`;
  //   return this.http.post<Cycles[]>(url, null);
  // }

  // returnCycle(id: number, count: number): Observable<Cycles[]> {
  //   const url = `${this.apiUrl}/${id}/return?count=${count}`;
  //   return this.http.post<Cycles[]>(url, null);
  // }

  // borrowCycle(id: number, count: number): Observable<Cycles[]> {
  //   const url = `${this.apiUrl}/${id}/borrow?count=${count}`;
  //   return this.http.post<Cycles[]>(url, null);
  // }

  // rentCycle(id: number, count: number): Observable<Cycles[]> {
  //   const url = `${this.apiUrl}/${id}/rent?count=${count}`;
  //   return this.http.post<Cycles[]>(url, null);
  // }

  // getCycles(): Observable<Cycles[]> {
  //   const url = `${this.apiUrl}/cycle/list`;
  //   const headers = this.getHeaders();
  //   console.log('head'+headers);
  //   return this.http.get<Cycles[]>(url, { headers });
  // }

  restockCycle(id: number, count: number): Observable<Cycles[]> {
    const url = `${this.apiUrl}/${id}/restock?count=${count}`;
    const headers = this.getHeaders();
    return this.http.post<Cycles[]>(url, null, { headers });
  }

  returnCycle(id: number, count: number): Observable<Cycles[]> {
    const url = `${this.apiUrl}/${id}/return?count=${count}`;
    const headers = this.getHeaders();
    return this.http.post<Cycles[]>(url, null, { headers });
  }

  borrowCycle(id: number, count: number): Observable<Cycles[]> {
    const url = `${this.apiUrl}/${id}/borrow?count=${count}`;
    const headers = this.getHeaders();
    return this.http.post<Cycles[]>(url, null, { headers });
  }

  rentCycle(id: number, count: number): Observable<Cycles[]> {
    const url = `${this.apiUrl}/${id}/rent?count=${count}`;
    const headers = this.getHeaders();
    console.log("rent" + this.getHeaders().get);
    return this.http.post<Cycles[]>(url, null, { headers });
  }

  setToken(Token : string , name: string) {
    const url = `${this.apiUrl}/auth/tokenSet`;
    console.log(url)
    const requestBody = { token: Token, username: name }; 
    return this.http.post<any>(url,requestBody);
  }
}

