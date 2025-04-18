import { Pipe, PipeTransform } from '@angular/core';
import {formatDistance} from 'date-fns'
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: string): string {
    return formatDistance(new Date(value),Date());
  }

}
