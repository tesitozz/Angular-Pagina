import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookUpdateComponent } from './book-update/book-update.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/list', component: UserListComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/update/:id', component: UserUpdateComponent },
  { path: 'book/list', component: BookListComponent },
  { path: 'book/create', component: BookCreateComponent },
  { path: 'book/update/:id', component: BookUpdateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
