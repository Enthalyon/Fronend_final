import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Politicalparty } from '../models/politicalparty.model';

@Injectable({
  providedIn: 'root'
})
export class PoliticalpartyService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Politicalparty[]>{
     return this.http.get<Politicalparty[]>(`${environment.url_api_gateway}/politicalpartys`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Politicalparty>{
    return this.http.get<Politicalparty>(`${environment.url_api_gateway}/politicalparty/${id}`);
  }
  /**
   * 
   * @param politicalparty 
   * @returns 
   */

  create(politicalparty: Politicalparty){
    return this.http.post<Politicalparty>(`${environment.url_api_gateway}/politicalparty/insert`, politicalparty);
  }
  /**
   * 
   * @param id 
   * @param politicalparty 
   * @returns 
   */

  edit(id: String, politicalparty: Politicalparty){
    return this.http.put<Politicalparty>(`${environment.url_api_gateway}/politicalparty/update/${id}`, politicalparty);
  }
  /**
   * 
   * @param id 
   * @returns 
   */

  delete(id: String){
    return this.http.delete(`${environment.url_api_gateway}/politicalparty/delete/${id}`);
  }
}
