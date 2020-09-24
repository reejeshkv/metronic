import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { PrimengModule } from '../primeng/primeng.module';
import { RippleModule } from 'primeng/ripple';

@NgModule({
  declarations: [UsersComponent, RolesComponent, UserManagementComponent],
  imports: [CommonModule, UserManagementRoutingModule, PrimengModule, FormsModule, RippleModule],
})
export class UserManagementModule {}
