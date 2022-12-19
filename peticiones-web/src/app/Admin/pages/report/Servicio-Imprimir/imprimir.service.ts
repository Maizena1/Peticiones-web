import { Injectable } from '@angular/core';
import * as jsPDF from 'jspdf';


@Injectable({
  providedIn: 'root'
})
export class ImprimirService {

  constructor() { }


  imprimir( ) {
    const pdf = new jsPDF();
    pdf.text('Hello world!', 10, 10);
    pdf.save('mi-pdf.pdf');   
  } 

}
