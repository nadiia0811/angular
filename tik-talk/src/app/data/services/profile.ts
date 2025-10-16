import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';
import { Pageble } from '../interfaces/pageble.interface';
import { tap, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  baseUrl = 'https://icherniakov.ru/yt-course';
  me = signal<Profile | null>(null);

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseUrl}/account/test_accounts`);
  }

  getMe(): Observable<Profile> { 
    return this.http.get<Profile>(`${this.baseUrl}/account/me`)
      .pipe(
        tap(res => this.me.set(res))
      );
  }

  getSubscribersShortlist() {
    return this.http.get<Pageble<Profile>>(`${this.baseUrl}/account/subscribers/`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseUrl}/account/${id}`);
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseUrl}/account/me`, profile);
  }
}
