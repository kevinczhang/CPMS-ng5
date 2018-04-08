import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'deletion-confirm-dialog.html',
  })
  export class DeletionConfirmDialog {
  
    constructor(
      public dialogRef: MatDialogRef<DeletionConfirmDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }
  
    onClickYes(): void {
      this.dialogRef.close('Y');
    }

    onClickNo(): void {
        this.dialogRef.close('N');
    }
  
  }