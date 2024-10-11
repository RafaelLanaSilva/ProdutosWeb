import { CommonModule } from '@angular/common';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-cadastrar-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrl: './cadastrar-fornecedor.component.css'
})
export class CadastrarFornecedorComponent {

  mensagem: string = '';

    //método construtor para injeção de dependência
    constructor(
      private httpClient: HttpClient
    ){}

    form = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.maxLength(50)])
    });

    get f() {
      return this.form.controls;
    }

    onSubmit() {
      this.httpClient.post(environment.apiProdutoseFornecedores + "/suppliers/create",
        this.form.value).subscribe({
          next: (data: any) => {
            this.mensagem = `Fornecedor'${data.nome}', cadastrado com sucesso.`;
          this.form.reset();
          },
          error: (e) => {
            console.log(e.error);
          }
        })
      
    }


}
