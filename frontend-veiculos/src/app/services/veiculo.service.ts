import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Veiculo } from '../models/veiculo.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private apiUrl = `${environment.apiUrl}/veiculos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.apiUrl).pipe(
      catchError(err => throwError(() => err))
    );
  }

  buscarPorId(id: number): Observable<Veiculo> {
    return this.http.get<Veiculo>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }

  cadastrar(veiculo: Omit<Veiculo, 'id'>): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.apiUrl, veiculo).pipe(
      catchError(err => throwError(() => err))
    );
  }

  editar(id: number, veiculo: Omit<Veiculo, 'id'>): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.apiUrl}/${id}`, veiculo).pipe(
      catchError(err => throwError(() => err))
    );
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => throwError(() => err))
    );
  }
}
