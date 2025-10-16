import { Component, inject, effect } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../data/services/profile';
import { Profile } from '../../data/interfaces/profile.interface';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-settings-page',
  imports: [ProfileHeader, ReactiveFormsModule],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.scss',
})
export class SettingsPage {
  constructor() {
    effect(() => {
      const me = this.profileService.me();
      if (me) {
        this.form.patchValue({
          firstName: me.firstName,
          lastName: me.lastName,
          username: me.username,
          description: me.description,
          stack: me.stack.join(',')
        });
      }
    });
  }

  formBuilder = inject(FormBuilder);
  profileService = inject(ProfileService);

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  async onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const payload: Partial<Profile> = {
      firstName: formValue.firstName || '',
      lastName: formValue.lastName || '',
      username: formValue.username || '',
      description: formValue.description || '',
      stack: formValue.stack ? formValue.stack.split(',').map((s) => s.trim()) : [],
    };

    try {
      const updatedProfile = await firstValueFrom(this.profileService.patchProfile(payload));
      console.log('Profile updated:', updatedProfile);
    } catch (err) {
      console.error('Failed to save profile', err);
    } 
  }
}
