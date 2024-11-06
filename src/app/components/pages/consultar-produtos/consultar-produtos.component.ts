import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-consultar-produtos',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './consultar-produtos.component.html',
  styleUrl: './consultar-produtos.component.css'
})
export class ConsultarProdutosComponent {

    mensagem: string = '';
    products: any[] = [];

    constructor(
      private httpClient: HttpClient
    ){}
  
    ngOnInit() {
      this.httpClient.get(environment.apiProdutoseFornecedores 
        + "/products")
        .subscribe({ 
          next: (data) => {
            this.products = data as any[];
          },
          error:(e) => {
            console.log(e.error);
          }
      })
    }
  
    onDelete(id: string) {
      if (confirm('Deseja realmente excluir o produto selecionado?')) {
        this.httpClient.delete(environment.apiProdutoseFornecedores + "/products/" + id,)
          .subscribe({
            next: (data: any) => {
              this.mensagem = `Produto'${data.nome}', excluído com sucesso.`;            
            },
            error: (e) => {
              console.log(e.error);
            }
          })
      }
    }

}


