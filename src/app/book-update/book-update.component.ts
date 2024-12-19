import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_API_URL } from '../shared/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-update',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css',
})
export class BookUpdateComponent implements OnInit {
  formulario: FormGroup;
  apiUrl: string = `${BASE_API_URL}/libros`;
  libroId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
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

  ngOnInit(): void {
    this.libroId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.libroId) {
      this.obtenerLibro(this.libroId);
    }
  }

  obtenerLibro(id: number): void {
    this.http.get<any>(`${this.apiUrl}/${id}`).subscribe({
      next: (libro) => {
        this.formulario.patchValue({
          titulo: libro.titulo,
          descripcion: libro.descripcion,
          autor: libro.autor,
          genero: libro.genero,
          publicacion: libro.publicacion,
          portada: libro.portada,
          stock: libro.stock,
        });
      },
      error: (error) => {
        console.error('Error al obtener el libro:', error);
      },
    });
  }

  actualizarLibro(): void {
    if (this.formulario.valid && this.libroId) {
      this.http
        .put(`${this.apiUrl}/${this.libroId}`, this.formulario.value)
        .subscribe({
          next: (response) => {
            console.log('Libro actualizado exitosamente:', response);
            this.router.navigate(['/book/list']);
          },
          error: (error) => {
            console.error('Error al actualizar libro:', error);
          },
        });
    } else {
      console.error('Formulario inválido o libroId no definido');
    }
  }
}
