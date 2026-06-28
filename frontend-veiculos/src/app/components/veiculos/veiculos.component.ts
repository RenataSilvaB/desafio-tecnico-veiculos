import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VeiculoService } from '../../services/veiculo.service';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.component.html',
  styleUrls: ['./veiculos.component.scss']
})
export class VeiculosComponent implements OnInit {

  veiculos$ = this.veiculoService.listar();
  formulario!: FormGroup;
  editandoId: number | null = null;

  constructor(
    private veiculoService: VeiculoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  criarFormulario(): void {
    this.formulario = this.fb.group({
      placa:   ['', Validators.required],
      chassi:  ['', Validators.required],
      renavam: ['', Validators.required],
      modelo:  ['', Validators.required],
      marca:   ['', Validators.required],
      ano:     ['', Validators.required]
    });
  }

  salvar(): void {
    if (this.formulario.invalid) return;

    if (this.editandoId) {
      this.veiculoService.editar(this.editandoId, this.formulario.value).subscribe(() => {
        this.veiculos$ = this.veiculoService.listar();
        this.cancelar();
      });
    } else {
      this.veiculoService.cadastrar(this.formulario.value).subscribe(() => {
        this.veiculos$ = this.veiculoService.listar();
        this.cancelar();
      });
    }
  }

  editar(veiculo: any): void {
    this.editandoId = veiculo.id;
    this.formulario.patchValue(veiculo);
  }

  excluir(id: number): void {
    this.veiculoService.excluir(id).subscribe(() => {
      this.veiculos$ = this.veiculoService.listar();
    });
  }

  cancelar(): void {
    this.editandoId = null;
    this.formulario.reset();
  }
}


