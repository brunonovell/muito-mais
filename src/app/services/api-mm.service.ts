import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiMmService {
  constructor(private http: HttpClient) {}

  private urlGateway(): string {
    return `http://138.219.98.204:8081/api/`;
  }

  private token(): any {
    return localStorage.getItem('token');
  }

  /**
   * Gerador do caberçalho de todas as requisições.
   */
  obtemCabercalhoRequisicao(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token(),
      }),
    };
  }

  /**
   * Executa pesquisa para preencher a tabela de produtos.
   * @param pesquisa
   * @param stockoperator
   * @param operator
   * @param fiscalsituation
   * @param company
   * @returns Observable<any>
   */
  pesquisar(
    pesquisa: string,
    stockoperator: string,
    operator: number,
    fiscalsituation: string,
    company: number
  ): Observable<any> {
    return this.http.get<any[]>(
      this.urlGateway() +
        `api/routines/centralstock/v1/search?search=${pesquisa}&stockoperator=${stockoperator}&operator=${operator}&fiscalsituation=${fiscalsituation}&company=${company}`,
      this.obtemCabercalhoRequisicao()
    );
  }

  /**
   * Executa API para zerar o estoque negativo da empresa selecionada.
   * @param company
   * @returns Observable<any>
   */
  zerarEstoqueNegativo(company: number): Observable<any> {
    return this.http.get(
      this.urlGateway() +
        `api/routines/centralstock/v1/zerarestoquenegativo?company=${company}`,
      this.obtemCabercalhoRequisicao()
    );
  }

  /**
   * Executa API para remover os dados sem documento fiscal vinculado.
   * @param idempresa
   * @returns
   */
  removeDadosNaoFiscal(idempresa: number): Observable<any> {
    return this.http.post<any>(
      this.urlGateway() + `api/routines/centralstock/v1/deletasn`,
      { idempresa: idempresa },
      this.obtemCabercalhoRequisicao()
    );
  }

  /**
   * Realiza login na plataforma de dados.
   * @param email
   * @param senha
   * @returns
   */
  realizaLogin(email: string, senha: string): Observable<any> {
    return this.http
      .post(this.urlGateway() + `login`, {
        email: email,
        senha: senha,
      }, { observe: 'response' });
  }
}
