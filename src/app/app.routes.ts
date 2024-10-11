import { Routes } from '@angular/router';
import { CadastrarFornecedorComponent } from './components/pages/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { ConsultarProdutosComponent } from './components/pages/consultar-produtos/consultar-produtos.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CadastrarProdutoComponent } from './components/pages/cadastrar-produto/cadastrar-produto.component';
import { ConsultarFornecedoresComponent } from './components/pages/consultar-fornecedores/consultar-fornecedores.component';


export const routes: Routes = [
    {
        path: 'pages/cadastrar-produto',
        component: CadastrarProdutoComponent
    },
    {
        path: 'pages/consultar-produtos',
        component: ConsultarProdutosComponent
    },
    {
        path: 'pages/cadastrar-fornecedor',
        component: CadastrarFornecedorComponent
    },
    {
        path: 'pages/consultar-fornecedores',
        component: ConsultarFornecedoresComponent
    },
    {
        path: 'pages/home',
        component: HomeComponent
    },
    {
        path: '', //rota raiz
        pathMatch: 'full',
        redirectTo: 'pages/home'
    }

];