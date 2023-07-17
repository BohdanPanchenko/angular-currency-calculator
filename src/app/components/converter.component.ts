import { Component, OnInit } from '@angular/core';
import { currenciesList } from '../data/currency';
import { DataService } from '../services/data.service';

interface InputValues {
  [key: string]: any;
}

@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  currenciesCodes = currenciesList;
  currenciesValues: any;
  fromCode = 'UAH';
  toCode = 'USD';

  inputValues: InputValues = {
    from: 0,
    to: 0,
  };

  inputFocused = '';
  offFocus = true;

  constructor(private dataService: DataService) {}
  ngOnInit(): void {
    this.dataService.getData().subscribe((data) => {
      this.currenciesValues = data;
    });
  }
  reverseCodes() {
    [this.fromCode, this.toCode] = [this.toCode, this.fromCode];
    [this.inputValues['from'], this.inputValues['to']] = [
      this.inputValues['to'],
      this.inputValues['from'],
    ];
  }

  onOptionChange(e: any) {
    this.convertValues(this.inputFocused);
  }
  onReverseHandler() {}

  calculate(fromCode: string, toCode: string) {
    let outputValue: string | number;
    outputValue =
      this.inputValues[this.inputFocused] /
      (this.currenciesValues.data[fromCode].value /
        this.currenciesValues.data[toCode].value);

    outputValue = this.round(outputValue.toString());
    return Number(outputValue);
  }
  onFocusHandler(e: any) {
    this.inputFocused = e.target.getAttribute('data-name');
    this.offFocus = false;
  }

  onBlurHandler() {
    this.offFocus = true;
  }

  onInputHandler(e: any) {
    if (e.target.value === '') e.target.value = '0';
    let value = e.target.value;
    const pattern = /^\d+(?:[\.]\d*)?$/;

    if (!pattern.test(value) && !this.isValidNumber(value)) {
      e.target.value = this.inputValues[this.inputFocused];
      return;
    }

    this.inputValues[this.inputFocused] = this.removeZero(value);

    this.convertValues(e.target.getAttribute('data-name'));
  }
  convertValues(activeField: string) {
    if (activeField === 'from') {
      this.inputValues['to'] = this.calculate(this.fromCode, this.toCode);
    } else
      this.inputValues['from'] = this.calculate(this.toCode, this.fromCode);
  }

  isValidNumber(input: any) {
    return !isNaN(input) && !input.includes(' ') ? true : false;
  }

  removeZero(input: string) {
    return input[input.length - 1] === '.' ? input : Number(input);
  }

  round(input: string): string {
    let number = Number(input);
    return number % 1 === 0 ? input : number.toFixed(2);
  }
}
