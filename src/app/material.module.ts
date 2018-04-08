import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatPaginatorModule, 
  MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
  MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
  MatCardModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatSliderModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatSnackBarModule, MatSliderModule],
  exports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule, MatDialogModule, MatSnackBarModule, MatSnackBarModule, MatSliderModule],
})
export class MaterialModule { }