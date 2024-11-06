import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-editar-fornecedores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './editar-fornecedores.component.html',
  styleUrl: './editar-fornecedores.component.css'
})
export class EditarFornecedoresComponent {

  //atributos
  mensagemSucesso: string = '';
  mensagemErro: string = '';
  id: string = '';

  //construtor
  constructor(
    private httpClient: HttpClient,
    private activatesRoute: ActivatedRoute
  ){}

  ngOnInit(){
    //capturando o id do cliente enviado na URL (rota)
    this.id = this.activatesRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.apiProdutoseFornecedores + "/suppliers/" + this.id)
      .subscribe({
          next: (data) => {
            //preenchendo o formulário
            this.form.patchValue(data);
          },
          error: (e) => {
            console.log(e.error);
          }
      })
  }

  //estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [Validators.required, Validators.minLength(8)])
  });


  get f() {
    return this.form.controls;
  }

  //função para capturar o submit
  onSubmit() {
    //limpar as mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.httpClient.put(environment.apiProdutoseFornecedores + "/suppliers/" + this.id,
        this.form.value)
        .subscribe({
          next: (data: any) => {
            this.mensagemSucesso = `Fornecedor '${data.name}', atualizado com sucesso.`;
          },
          error: (e) => {
            //capturando mensagem de erro
            this.mensagemErro = e.error.message;
          }
        });
  }

}
