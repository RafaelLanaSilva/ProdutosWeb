import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-consultar-fornecedores',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './consultar-fornecedores.component.html',
  styleUrl: './consultar-fornecedores.component.css'
})
export class ConsultarFornecedoresComponent {

  suppliers: any[] = [];
  mensagem: string = '';

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
    })
  }

  onDelete(id: string) {
    if (confirm('Deseja realmente excluir o fornecedor selecionado?')) {
      this.httpClient.delete(environment.apiProdutoseFornecedores + "/suppliers/" + id,)
        .subscribe({
          next: (data: any) => {
            this.mensagem = `Fornecedor'${data.nome}', excluído com sucesso.`;            
          },
          error: (e) => {
            console.log(e.error);
          }
        })
    }
  }

}
