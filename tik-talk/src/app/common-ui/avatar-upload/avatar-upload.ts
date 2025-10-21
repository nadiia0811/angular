import { Component, signal } from '@angular/core';
import { Dnd } from '../directives/dnd';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avatar-upload',
  imports: [Dnd, FormsModule],
  templateUrl: './avatar-upload.html',
  styleUrl: './avatar-upload.scss'
})
export class AvatarUpload {
  preview = signal<string>("/assets/images/user.png");
  avatar = null;

  onKeyEnter(input: HTMLInputElement) {
    input.click();
  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.processFile(file);
  }

  onFileDropped(file: File) {
    this.processFile(file);
  }

  processFile(file: File | null | undefined) {
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
