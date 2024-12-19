import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BASE_API_URL } from '../shared/constants';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-create.component.html',
  styleUrl: './book-create.component.css',
})
export class BookCreateComponent {
  formulario: FormGroup;
  apiUrl: string = `${BASE_API_URL}/libros`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      publicacion: ['', [Validators.required]],
      portada: ['', [Validators.required]], // Campo URL de portada
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }

  crearLibro(): void {
    if (this.formulario.valid) {
      this.http.post(`${this.apiUrl}/`, this.formulario.value).subscribe({
        next: (response) => {
          console.log('Libro creado exitosamente:', response);
          this.router.navigate(['/book/list']);
        },
        error: (error) => {
          console.error('Error al crear libro:', error);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
