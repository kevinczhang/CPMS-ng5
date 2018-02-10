import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTableModule, MatPaginatorModule, 
  MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
  MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
  MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule],
  exports: [MatButtonModule, MatTableModule, MatPaginatorModule, 
    MatInputModule, MatMenuModule, MatIconModule, MatSidenavModule,
    MatToolbarModule, MatCheckboxModule, MatListModule, MatExpansionModule,
    MatAutocompleteModule, MatSelectModule, MatProgressSpinnerModule, MatCardModule],
})
export class MaterialModule { }