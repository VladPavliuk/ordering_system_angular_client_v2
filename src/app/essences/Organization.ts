import {DaySchedule} from './DaySchedule';

export class Organization {
  id?: number;
  title: string;
  imagePath?: string;
  organization_ID?: any;
  schedule: DaySchedule[];
  mark?: number;
}
