import { Component, inject } from '@angular/core';
import { CurrencyService } from '../../Service/currency.service';
import { currency } from '../../Models/currency.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.css'
})
export class CurrencyComponent {
  result: currency = {
    data: 0
  };
  total: number = 0;
  cambio: number = 0;

  private _currencyService = inject(CurrencyService);

  ngOnInit(): void{
    this.convert();
  }

  convert(): void{
    const source = "eur"
    const target = "cop"

    this._currencyService.convertCurrency(source, target).subscribe({
      next: (response) => {
        this.result = response;
        console.log(`1 ${source} es igual ${this.result.data} ${target}`);
      },
      error: (error) => {
        console.error('Error Occurred: ', error);
      }
    });
  }

  calcular(trm: number): number{
    this.total = this.cambio * trm;
    return this.total
  }
}
