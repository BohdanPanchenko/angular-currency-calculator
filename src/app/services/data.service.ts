import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url =
    'https://api.currencyapi.com/v3/latest?apikey=cur_live_XfnhISa1rbRGzcM6VL39S6yK5d2Dsa390UEFheOj&currencies=EUR%2CUSD%2CUAH&base_currency=UAH';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.url);
  }
}
