import { IJob } from './job.model';

export interface IPerson {
  id: string;
  lastName: string;
  firstName: string;
  birthDate: string;
  jobs: IJob[];
}

export class Person implements IPerson {
  constructor(
    public id: string,
    public lastName: string,
    public firstName: string,
    public birthDate: string,
    public jobs: IJob[]
  ) {}

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
