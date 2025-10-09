import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl'
})
export class ImgPipe implements PipeTransform {

  transform(value: string | null| undefined): string {
    if(!value) return '/assets/images/img1.png';
    return `https://icherniakov.ru/yt-course/${value}`;
  }
}
