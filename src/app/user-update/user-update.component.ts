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

@Component({
  selector: 'app-user-update',
  imports: [ReactiveFormsModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css',
})
export class UserUpdateComponent implements OnInit {
  formulario: FormGroup;
  usuarioId: number = 0;
  apiUrl: string = `${BASE_API_URL}/usuarios`;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    // Inicializar formulario
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      usuario: ['', Validators.required],
      contra: ['', [Validators.required, Validators.minLength(6)]],
      correo: ['', [Validators.required, Validators.email]],
      movil: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  ngOnInit(): void {
    // Obtener el id desde la ruta
    this.usuarioId = +this.route.snapshot.paramMap.get('id')!;
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.http.get<any>(`${this.apiUrl}/${this.usuarioId}`).subscribe({
      next: (data) => {
        // Rellenar el formulario con los datos del usuario
        this.formulario.patchValue({
          nombre: data.nombre,
          apellidos: data.apellidos,
          usuario: data.usuario,
          contra: data.contra,
          correo: data.correo,
          movil: data.movil,
        });
      },
      error: (error) => {
        console.error('Error al cargar el usuario:', error);
      },
    });
  }

  actualizarUsuario(): void {
    if (this.formulario.valid) {
      // Enviar los datos actualizados al backend usando PUT
      this.http
        .put(`${this.apiUrl}/${this.usuarioId}`, this.formulario.value)
        .subscribe({
          next: (response) => {
            console.log('Usuario actualizado exitosamente:', response);
            this.router.navigate(['/user/list']);
          },
          error: (error) => {
            console.error('Error al actualizar el usuario:', error);
          },
        });
    } else {
      console.error('Formulario inválido');
    }
  }
}
