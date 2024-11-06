import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consultar-fornecedores',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './consultar-fornecedores.component.html',
  styleUrl: './consultar-fornecedores.component.css'
})
export class ConsultarFornecedoresComponent {

  suppliers: any[] = [];
  mensagemSucesso: string = '';

  constructor(
    private httpClient: HttpClient
  ){}

  ngOnInit() {
    this.httpClient.get(environment.apiProdutoseFornecedores 
      + "/suppliers")
      .subscribe({ 
        next: (data) => {
          this.suppliers = data as any[];
        },
        error:(e) => {
          console.log(e.error);
        }
    });
  }

  onDelete(id: string) {
    if (confirm('Deseja realmente excluir o fornecedor selecionado?')) {
      this.httpClient.delete(environment.apiProdutoseFornecedores + "/suppliers/" + id,)
        .subscribe({
          next: (data: any) => {
            this.mensagemSucesso = `Fornecedor'${data.name}', excluído com sucesso.`; 
            this.ngOnInit();                     
          }
        })
    }
  }

}
