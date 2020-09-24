import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

@NgModule({
    imports: [TableModule, DropdownModule, ToastModule, InputTextModule, ButtonModule],
    exports: [TableModule, DropdownModule, ToastModule, InputTextModule, ButtonModule],
    entryComponents: [
    ],
    providers: [
    ],
    declarations: [],
  })
  export class PrimengModule {}
  