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

  get age() {
    const ageDifMs = Date.now() - new Date(this.birthDate).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
}
