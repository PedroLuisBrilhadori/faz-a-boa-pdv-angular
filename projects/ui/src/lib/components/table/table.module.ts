import { NgModule } from '@angular/core';

import { TableComponent } from './table.component';

import { CommonModule } from '@angular/common';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPseudoCheckboxModule,
    MatCheckboxModule,
    MatSortModule,
  ],
  exports: [TableComponent],
})
export class TableModule {}
