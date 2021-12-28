import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiMmService {


  constructor(private http: HttpClient) {
  }


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

  manutencaoes(tipoManutencao: String, idEmpresa: Number): Observable<any> {
    const urlPreenchida: string = this.urlManutencao(tipoManutencao);
    console.log(urlPreenchida);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token()
      })
    }

    const body = {
      'idempresa': idEmpresa
    }

    return this.http.post<any>(urlPreenchida, body, httpOptions);
  }


  private urlConsulta(pesquisa: String, stockoperator: String, operator: Number, fiscalsituation: String, company: Number): string {
    return `http://138.219.98.204:8081/api/api/routines/centralstock/v1/search?search=${pesquisa}&stockoperator=${stockoperator}&operator=${operator}&fiscalsituation=${fiscalsituation}&company=${company}`;
  }


  private urlManutencao(tipoManutencao: String): string {
    return `http://138.219.98.204:8081/api/api/routines/centralstock/v1/${tipoManutencao}`;
  }


  private token(): string {
    return `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtdWl0b21haXN1cEBob3RtYWlsLmNvbSIsImV4cCI6MjI2MTIzNjcwMX0.xkN0oUcVitTMvU-msdiBorpwMNQ3h8eLIMwJP-EP0utOpjbmMD_ZkdAZWqKBoxP1OXtF9XS0dX5Slu5fUhptYQ`
  }
}
