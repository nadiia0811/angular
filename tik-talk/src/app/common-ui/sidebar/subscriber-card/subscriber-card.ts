import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/interfaces/profile.interface';
import { ImgPipe } from '../../../helpers/pipes/img-pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [ImgPipe],
  templateUrl: './subscriber-card.html',
  styleUrl: './subscriber-card.scss'
})
export class SubscriberCard {
  @Input() profile!: Profile;
}
