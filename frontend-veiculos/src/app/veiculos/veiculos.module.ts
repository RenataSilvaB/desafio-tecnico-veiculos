import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VeiculosRoutingModule } from './veiculos-routing.module';
import { VeiculosComponent } from '../components/veiculos/veiculos.component';
import { VeiculoFormComponent } from '../components/veiculo-form/veiculo-form.component';
import { ConfirmacaoDialogComponent } from '../components/confirmacao-dialog/confirmacao-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    VeiculosComponent,
    VeiculoFormComponent,
    ConfirmacaoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VeiculosRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule
  ]
})
export class VeiculosModule { }
