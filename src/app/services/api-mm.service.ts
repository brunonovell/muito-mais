import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';






@Injectable({
  providedIn: 'root'
})
export class ApiMmService {



  constructor(private http: HttpClient) { }


  pesquisar(pesquisa: String, stockoperator: String, operator: Number, fiscalsituation: String, company: Number): Observable<any> {

    const urlPreenchida: string = this.urlConsulta(pesquisa, stockoperator, operator, fiscalsituation, company);


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token()
      })
    }

    return this.http.get<any[]>(urlPreenchida, httpOptions);
  }


  private urlConsulta(pesquisa: String, stockoperator: String, operator: Number, fiscalsituation: String, company: Number): string {
    return `http://138.219.98.204:8081/api/api/routines/centralstock/v1/search?search=${pesquisa}&stockoperator=${stockoperator}&operator=${operator}&fiscalsituation=${fiscalsituation}&company=${company}`;
  }



  private token(): string {
    return `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdWl0b21haXN1cEBob3RtYWlsLmNvbSIsImV4cCI6MjI2MTIzNjcwMX0.xkN0oUcVitTMvU-msdiBorpwMNQ3h8eLIMwJP-EP0utOpjbmMD_ZkdAZWqKBoxP1OXtF9XS0dX5Slu5fUhptYQ`
  }
}
