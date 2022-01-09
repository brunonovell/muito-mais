import {ApiMmService} from './services/api-mm.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  emailLogin: string = '';
  senhaLogin: string = '';

  VALOR_CAMPO_PESQUISA: string = '';
  VALOR_CAMPO_STOCKOPERATOR: string = '';
  VALOR_CAMPO_OPERATOR: number = 0;
  VALOR_CAMPO_FISCALSITUATION: string = '';
  VALOR_CAMPO_COMPANY: number = 0;

  listaProdutos: Array<any> = []

  qtdeProdutos: number = 0;
  valorEmCusto: number = 0;
  valorEmCustoFiscal: number = 0;
  valorEmVenda: number = 0;
  valorLucroBruto: number = 0;

  constructor(private service: ApiMmService) {
  }

  ngOnInit(): void {

  }

  pesquisar(): void {
    if (this.VALOR_CAMPO_COMPANY !== 0) {
      this.service.pesquisar(this.VALOR_CAMPO_PESQUISA.toUpperCase(), this.VALOR_CAMPO_STOCKOPERATOR, this.VALOR_CAMPO_OPERATOR, this.VALOR_CAMPO_FISCALSITUATION, this.VALOR_CAMPO_COMPANY).subscribe(dados => {
        this.listaProdutos = dados.list;
        this.giraTotalizador();
      });
    } else {
      alert("Compos Obrigatórios!\n - empresa");
    }
  }

  giraTotalizador(): void {
    this.limpaTotalizador();

    this.qtdeProdutos = this.listaProdutos.length;
    for (var i = 0; i < this.listaProdutos.length; i++) {
      //Contabilidade de estoques real
      if (this.listaProdutos[i].er >= 0) {
        this.valorEmCusto = this.valorEmCusto + (this.listaProdutos[i].er * this.listaProdutos[i].pc);
        this.valorEmVenda = this.valorEmVenda + (this.listaProdutos[i].er * this.listaProdutos[i].pv);
      }

      //Contabilidade de estoques fiscal
      if (this.listaProdutos[i].ef >= 0) {
        this.valorEmCustoFiscal = this.valorEmCustoFiscal + (this.listaProdutos[i].ef * this.listaProdutos[i].pc);
      }
    }

    this.valorLucroBruto = (this.valorEmVenda - this.valorEmCusto);
  }

  removeDadosNaoFiscal(): void {
      if(this.VALOR_CAMPO_COMPANY !== 0){
        this.service.removeDadosNaoFiscal(this.VALOR_CAMPO_COMPANY).subscribe((retorno) => {
          alert("Operação realizada com sucesso");
          this.pesquisar();
        });
      }else{
        alert("Ops! Selecione a empresa.")
      }
  }

  zerarEstoqueNegativo(): void {
    if(this.VALOR_CAMPO_COMPANY !== 0){
      this.service.zerarEstoqueNegativo(this.VALOR_CAMPO_COMPANY).subscribe((retorno) => {
        alert("Operação realizada com sucesso");
        this.pesquisar();
      });
    }else{
      alert("Ops! Selecione a empresa.")
    }
  }

  limpaTotalizador() {
    this.qtdeProdutos = 0;
    this.valorEmCusto = 0;
    this.valorEmVenda = 0;
    this.valorLucroBruto = 0;
    this.valorEmCustoFiscal = 0;
  }

  verificaUsuarioLogado(): boolean {
    let token = localStorage.getItem('token');
    if(token !== undefined && token !== null && token !== 'offline') {
      return true;
    }else {
      return false;
    }
  }

  realizaLogin() {
    this.service.realizaLogin(this.emailLogin, this.senhaLogin).subscribe((resp) => {
      console.log(resp.body.token);
      localStorage.setItem('token', resp.body.token);
    });
  }

  realizaLogoff() {
    localStorage.setItem('token', 'offline');
  }
}
