import { Component, signal } from '@angular/core';


@Component({
  selector: 'app-avatar-upload',
  imports: [],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {
  preview = signal<string>("/assets/images/user.png");

  onKeyEnter(input: HTMLInputElement) {
    input.click();
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(!file || !file.type.match("image")) { 
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      this.preview.set(event?.target?.result?.toString() || "");
    }

    reader.readAsDataURL(file);
  }
}
