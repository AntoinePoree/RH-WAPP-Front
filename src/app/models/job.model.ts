export interface IJob {
  id: string;
  name: string;
  jobName: string;
  startDate: string;
  endDate?: string;
}

export class Job implements IJob {
  constructor(
    public id: string,
    public name: string,
    public jobName: string,
    public startDate: string,
    public endDate?: string
  ) {}
}
