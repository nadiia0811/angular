import { Component, input, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import { ImgPipe } from '../../helpers/pipes/img-pipe';


@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [ImgPipe],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.scss'
})
export class ProfileHeader {
 // profile = input<Profile>();
 @Input() profile!: Profile;
}
