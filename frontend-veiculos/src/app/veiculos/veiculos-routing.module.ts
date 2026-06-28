import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeiculosComponent } from '../components/veiculos/veiculos.component';
import { VeiculoFormComponent } from '../components/veiculo-form/veiculo-form.component';

const routes: Routes = [
  { path: '', component: VeiculosComponent },
  { path: 'novo', component: VeiculoFormComponent },
  { path: 'editar/:id', component: VeiculoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeiculosRoutingModule { }
