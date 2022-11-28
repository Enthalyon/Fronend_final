import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  tablesReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/table_results/all`);
  }

  /**
   * 
   * @param tableId
   * @returns 
   */
  tableReport(tableId: string) {
    return this.http.get(`${environment.url_api_gateway}/reports/table_results/${tableId}`);
  }

  /**
   * 
   * @returns 
   */
  tablesTopReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/tables_top_results`);
  }

  /**
   * 
   * @returns 
   */
  candidatesReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/candidate_results/all`);
  }

  /**
   * 
   * @param candidateId 
   * @returns 
   */
  courseReport(candidateId: string) {
    return this.http.get(`${environment.url_api_gateway}/reports/candidate_results/${candidateId}`);
  }

  /**
   * 
   * @returns 
   */
  politicalpartyReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/politicalparty_results`);
  }

  /**
   * 
   * @returns 
   */
  distributionReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/politicalparty_distribution`);
  }
}
