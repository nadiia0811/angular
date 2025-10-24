import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ProfileService } from '../../data/services/profile';
import { switchMap, debounceTime, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.html',
  styleUrl: './profile-filters.scss',
})
export class ProfileFilters {
  formBuilder = inject(FormBuilder);
  searchForm = this.formBuilder.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
    city: [''],
  });

  profileService = inject(ProfileService);

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith([]),
        debounceTime(500),
        switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue);
        }),
        takeUntilDestroyed()  // automatically cleans up subscription(prevent memory leaks)
      )
      .subscribe();
  }
}
