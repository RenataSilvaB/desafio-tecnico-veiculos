import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private apiUrl = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  cadastrar(veiculo: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, veiculo);
  }

  editar(id: number, veiculo: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, veiculo);
  }

  excluir(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
