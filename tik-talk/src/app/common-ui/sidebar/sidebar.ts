import { Component, inject, OnInit } from '@angular/core';
import { SvgIcon } from '../svg-icon/svg-icon';
import { SubscriberCard } from './subscriber-card/subscriber-card';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../data/services/profile';
import { AsyncPipe } from '@angular/common';
import { firstValueFrom, map, tap } from 'rxjs';
import { ImgPipe } from '../../helpers/pipes/img-pipe';


@Component({
  selector: 'app-sidebar',
  imports: [SvgIcon, SubscriberCard, RouterModule, AsyncPipe, ImgPipe],  
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss'
})
export class Sidebar implements OnInit{
  menuItems = [
    {icon: "home", label: "My page", link: "profile/me"},
    {icon: "search", label: "Search", link: "search"},
    {icon: "chat", label: "Chats", link: "chats"},
  ]

  profileService = inject(ProfileService);
  me = this.profileService.me;

  subscribers$ = this.profileService
    .getSubscribersShortlist()
    .pipe(
      map((res) => res.items.slice(0, 3)),
    ); 

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  } 
}
