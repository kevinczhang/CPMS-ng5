import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatPaginatorModule, 
  MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
  MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
  MatCardModule, MatSortModule, MatDialogModule } from '@angular/material';
  import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule, MatDialogModule, MatSnackBarModule],
  exports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, 
    MatCardModule, MatSortModule, MatDialogModule, MatSnackBarModule],
})
export class MaterialModule { }