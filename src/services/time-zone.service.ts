import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimeZoneService {
  constructor() {}

  timestampToDate(timestamp: number, format: string = 'L'): string {
    return moment(timestamp).format(format);
  }

  startOfDay(): number {
    return moment().startOf('day').unix() * 1000; // set to 12:00 am today
  }
  startOfWeek(): number {
    return moment().startOf('isoWeek').unix() * 1000; // set to 12:00 am today
  }
  startOfMonth(): number {
    return moment().startOf('month').unix() * 1000; // set to 12:00 am today
  }
}
