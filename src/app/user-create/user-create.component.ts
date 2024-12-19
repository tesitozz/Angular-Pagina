import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BASE_API_URL } from '../shared/constants';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
})
export class UserCreateComponent {
  formulario: FormGroup;
  apiUrl: string = `${BASE_API_URL}/usuarios`;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      contra: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      movil: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  crearUsuario(): void {
    if (this.formulario.valid) {
      this.http.post(`${this.apiUrl}/`, this.formulario.value).subscribe({
        next: (response) => {
          console.log('Usuario creado exitosamente:', response);
          this.router.navigate(['/user/list']);
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
