import { IJob } from './job.model';

export interface IPerson {
  id: string;
  lastName: string;
  firstName: string;
  bithDate: string;
  jobs: IJob[];
}
