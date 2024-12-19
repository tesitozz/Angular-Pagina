import { Component, OnInit } from '@angular/core';
import { BASE_API_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  libros: any[] = [];
  apiUrl: string = `${BASE_API_URL}/libros`;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
      },
    });
  }

  irACrearLibro(): void {
    this.router.navigate(['/book/create']);
  }

  irAActualizarLibro(id: number): void {
    this.router.navigate(['/book/update', id]);
  }

  eliminarLibro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.http.delete(`${this.apiUrl}/${id}`).subscribe({
        next: () => {
          console.log('Libro eliminado exitosamente');
          this.libros = this.libros.filter((libro) => libro.id !== id);
        },
        error: (error) => {
          console.error('Error al eliminar libro:', error);
        },
      });
    }
  }
}
