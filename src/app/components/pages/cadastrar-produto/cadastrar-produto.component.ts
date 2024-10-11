import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-cadastrar-produto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastrar-produto.component.html',
  styleUrl: './cadastrar-produto.component.css'
})
export class CadastrarProdutoComponent {

    mensagem: string = '';

    //método construtor para injeção de dependência
    constructor(
      private httpClient: HttpClient
    ){}

    //estrutura do formulário
    form = new FormGroup({
        nome: new FormGroup('', [Validators.required,Validators.maxLength(50)]),
        preco: new FormGroup('', [Validators.required, Validators.pattern(/^(\d+$)/)]),
        quantidade: new FormGroup('', [Validators.required, Validators.pattern(/^(\d+$)/)]),        
    })

    //variavel para acessar campos do formulário
    get f() {
      return this.form.controls;
    }

    //função para capturar o submit do formulário
    onSubmit() {
      this.httpClient.post(environment.apiProdutoseFornecedores + "/products/create", this.form.value)
      .subscribe({
        next: (data: any) => {
          this.mensagem = `Produto '${data.nome}', cadastrado com sucesso.`;
          this.form.reset();
        },
        error: (e) => {
          console.log(e.error);
        }
      })
    }

}
