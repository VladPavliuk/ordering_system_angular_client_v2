import {DaySchedule} from './DaySchedule';

export class Organization {
  id?: number;
  title: string;
  imagePath?: string;
  schedule: DaySchedule[];
  mark?: number;
}
