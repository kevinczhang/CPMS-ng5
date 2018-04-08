import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatPaginatorModule, 
  MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
  MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
  MatCardModule, MatSortModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule, MatDialogModule],
  exports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule],
})
export class MaterialModule { }