import { Component, Input } from '@angular/core';
import { Profile } from '../../data/interfaces/profile.interface';
import  { ImgPipe } from '../../helpers/pipes/img-pipe';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [ImgPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss'
})
export class ProfileCard {
  @Input() profile!: Profile;
}
