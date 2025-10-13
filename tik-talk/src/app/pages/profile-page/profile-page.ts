import { Component, inject } from '@angular/core';
import { ProfileHeader } from '../../common-ui/profile-header/profile-header';
import { ProfileService } from '../../data/services/profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, firstValueFrom, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ImgPipe } from '../../helpers/pipes/img-pipe';


@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeader, AsyncPipe, RouterLink, ImgPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss'
})
export class ProfilePage { 
  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }

  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = this.profileService.me; 
  profile = {
    stack: [
      "HTML", "CSS", "React", "Docker", "AWS", "Nest",
      "TypeScript", "Angular", "RxJS"
    ]
  }

  profile$ = this.route.params
    .pipe(
      switchMap(({id}) => {
        if(id === 'me') { 
          return this.profileService.getMe(); 
        }

        return this.profileService.getAccount(id);
      })
    );
    
    subscribers$ = this.profileService.getSubscribersShortlist()
     .pipe(
       map(data => data.items)
     );  
}
