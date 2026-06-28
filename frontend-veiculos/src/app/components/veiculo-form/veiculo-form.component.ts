import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {

  formulario!: FormGroup;
  editandoId: number | null = null;
  anos = Array.from({ length: 41 }, (_, i) => 1990 + i);
  anosFiltrados: number[] = [];

  private destroyRef = inject(DestroyRef);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private veiculoService: VeiculoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      placa:   ['', [Validators.required, Validators.pattern(/^[A-Za-z]{3}[0-9]{4}$|^[A-Za-z]{3}[0-9][A-Za-z][0-9]{2}$/)]],
      chassi:  ['', [Validators.required, Validators.pattern(/^[A-HJ-NPR-Za-hj-npr-z0-9]{17}$/)]],
      renavam: ['', [Validators.required, Validators.pattern(/^[0-9]{9,11}$/)]],
      modelo:  ['', [Validators.required, Validators.maxLength(100)]],
      marca:   ['', [Validators.required, Validators.maxLength(50)]],
      ano:     ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/), Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]]
    });

    this.anosFiltrados = this.anos;

    this.formulario.get('ano')?.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(valor => {
      this.anosFiltrados = this.anos.filter(a =>
        a.toString().includes(valor?.toString() || '')
      );
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editandoId = +id;
      this.veiculoService.buscarPorId(this.editandoId).subscribe({
        next: (veiculo) => this.formulario.patchValue(veiculo),
        error: () => {
          this.snackBar.open('Erro ao carregar veículo', 'Fechar', { duration: 3000 });
          this.router.navigate(['/veiculos']);
        }
      });
    }
  }

  salvar(): void {
    if (this.formulario.invalid) return;

    const operacao$ = this.editandoId
      ? this.veiculoService.editar(this.editandoId, this.formulario.value)
      : this.veiculoService.cadastrar(this.formulario.value);

    operacao$.subscribe({
      next: () => {
        const msg = this.editandoId ? 'Veículo atualizado com sucesso' : 'Veículo cadastrado com sucesso';
        this.snackBar.open(msg, 'Fechar', { duration: 3000 });
        this.router.navigate(['/veiculos']);
      },
      error: () => {
        this.snackBar.open('Erro ao salvar veículo', 'Fechar', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/veiculos']);
  }
}
