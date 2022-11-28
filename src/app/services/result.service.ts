import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Result[]>{
     return this.http.get<Result[]>(`${environment.url_api_gateway}/results`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Result>{
    return this.http.get<Result>(`${environment.url_api_gateway}/result/${id}`);
  }
  /**
   * 
   * @param result 
   * @returns 
   */

  create(result: Result){
    return this.http.post<Result>(`${environment.url_api_gateway}/result/insert`, result);
  }
  /**
   * 
   * @param id 
   * @param result 
   * @returns 
   */

  edit(id: String, result: Result){
    return this.http.put<Result>(`${environment.url_api_gateway}/result/update/${id}`, result);
  }
  /**
   * 
   * @param id 
   * @returns 
   */

  delete(id: String){
    return this.http.delete(`${environment.url_api_gateway}/result/delete/${id}`);
  }
}
