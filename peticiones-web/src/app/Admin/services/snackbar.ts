import { MatSnackBar, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";


export class snackBar{
    constructor(private _snackBar: MatSnackBar) { }

    verticalPosition: MatSnackBarVerticalPosition = 'top';

    SnackBarError(mensaje: string, icon: string){
        this._snackBar.open(mensaje, icon, {
          verticalPosition: this.verticalPosition,
          panelClass: ['red-snackbar'],
          duration: 3000,
        });
      }
    
      SnackBarSuccessful(mensaje: string, icon: string){
        this._snackBar.open(mensaje, icon, {
          verticalPosition: this.verticalPosition,
          panelClass: ['green-snackbar'],
          duration: 3000,
        });
      }
    
}