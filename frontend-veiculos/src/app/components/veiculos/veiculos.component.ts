import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { VeiculoService } from '../../services/veiculo.service';
import { Veiculo } from '../../models/veiculo.model';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent {

  private reload$ = new Subject<void>();
  veiculos$ = this.reload$.pipe(
    startWith(null),
    switchMap(() => this.veiculoService.listar())
  );

  colunas = ['placa', 'modelo', 'marca', 'ano', 'acoes'];

  constructor(
    private veiculoService: VeiculoService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  novo(): void {
    this.router.navigate(['/veiculos/novo']);
  }

  editar(veiculo: Veiculo): void {
    this.router.navigate(['/veiculos/editar', veiculo.id]);
  }

  excluir(veiculo: Veiculo): void {
    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '400px',
      data: {
        titulo: 'Excluir Veículo',
        mensagem: `Deseja excluir o veículo ${veiculo.modelo} (${veiculo.placa})?`,
        detalhe: 'Esta ação não pode ser desfeita.'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (!confirmado || veiculo.id == null) return;
      this.veiculoService.excluir(veiculo.id).subscribe({
        next: () => {
          this.snackBar.open('Veículo excluído com sucesso', 'Fechar', { duration: 3000 });
          this.reload$.next();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir veículo', 'Fechar', { duration: 3000 });
        }
      });
    });
  }
}
