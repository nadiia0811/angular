import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() {
    return this.http.get(`${this.baseUrl}account/test_accounts`);
  }
}
