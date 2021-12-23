import {ApiMmService} from './services/api-mm.service';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  VALOR_CAMPO_PESQUISA: string = '';
  VALOR_CAMPO_STOCKOPERATOR: string = '';
  VALOR_CAMPO_OPERATOR: Number = 0;
  VALOR_CAMPO_FISCALSITUATION: string = '';
  VALOR_CAMPO_COMPANY: Number = 0;

  listaProdutos: Array<any> = []

  qtdeProdutos: number = 0;
  valorEmCusto: number = 0;
  valorEmCustoFiscal: number = 0;
  valorEmVenda: number = 0;
  valorLucroBruto: number = 0;

  constructor(private serviceMuitoMais: ApiMmService) {
  }

  ngOnInit(): void {

  }

  pesquisar(): void {
    if (this.VALOR_CAMPO_PESQUISA.length !== 0 && this.VALOR_CAMPO_COMPANY !== 0) {

      this.serviceMuitoMais.pesquisar(this.VALOR_CAMPO_PESQUISA.toUpperCase(), this.VALOR_CAMPO_STOCKOPERATOR, this.VALOR_CAMPO_OPERATOR, this.VALOR_CAMPO_FISCALSITUATION, this.VALOR_CAMPO_COMPANY).subscribe(dados => {
        this.listaProdutos = dados.list;
        this.giraTotalizador();
      });
    } else {
      alert("Compos Obrigatórios!\n - pesquisa\n - empresa");
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

  limpaTotalizador() {
    this.qtdeProdutos = 0;
    this.valorEmCusto = 0;
    this.valorEmVenda = 0;
    this.valorLucroBruto = 0;
    this.valorEmCustoFiscal = 0;
  }

  zerarEstoqueNegativo(): void {
      if(this.VALOR_CAMPO_COMPANY !== 0){
        const retornoDoService = this.serviceMuitoMais.manutencaoes("deletasn",this.VALOR_CAMPO_COMPANY);

        retornoDoService
          .subscribe(retorno => alert(retorno.message));

      }else{
        alert("Não existe dados para a operação!")
      }
  }

  executarLimpeza(): void {
    if(this.VALOR_CAMPO_COMPANY !== 0){
      const retornoDoService = this.serviceMuitoMais.manutencaoes("zerarestoquenegativo",this.VALOR_CAMPO_COMPANY);

      retornoDoService
        .subscribe(retorno => console.log(retorno));

    }else{
      alert("Não existe dados para a operação!")
    }
  }
}
