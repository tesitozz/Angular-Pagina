import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../shared/constants';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  usuarios: any[] = [];
  apiUrl: string = `${BASE_API_URL}/usuarios`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    });
  }

  irACrearUsuario(): void {
    this.router.navigate(['/user/create']);
  }

  irAActualizarUsuario(id: number): void {
    this.router.navigate(['/user/update', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          console.log('Usuario eliminado exitosamente');
          // Actualizar lista
          this.usuarios = this.usuarios.filter((usuario) => usuario.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar usuario:', error);
        },
      });
    }
  }
}
