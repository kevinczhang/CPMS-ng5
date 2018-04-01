import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatPaginatorModule, 
  MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
  MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule, MatSortModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule, MatSortModule],
  exports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule, MatSortModule],
})
export class MaterialModule { }