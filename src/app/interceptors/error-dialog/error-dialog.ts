import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// Interface para tipar os dados que o interceptor enviará
export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-error-dialog',
  standalone: false,
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Ok</button>
    </div>
  `,
  styleUrl: './error-dialog.scss'
})
export class ErrorDialog {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialog>,
    // O MAT_DIALOG_DATA recebe os dados passados na função open() do interceptor
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
