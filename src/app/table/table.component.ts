import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatePipe } from '@angular/common';
import { PersonService } from '../services/person.service';
import { ELEMENT_DATA } from '../services/mock';

export interface PeriodicElement {
  name: string;
  birthDate: string;
  startDate: string;
  companyName: string;
  jobName: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [DatePipe, MatFormFieldModule, MatInputModule, MatTableModule],
})
export class TableComponent implements OnInit {
  personService = inject(PersonService);

  displayedColumns: string[] = [
    'name',
    'birthDate',
    'companyName',
    'jobName',
    'startDate',
    'endDate',
  ];

  dataSource = new MatTableDataSource<PeriodicElement>([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.personService.getList().subscribe((res) => {
      if (res && res.length) {
        this.dataSource = new MatTableDataSource(
          res.map((person, index) => {
            return {
              name: person.fullName,
              birthDate: person.birthDate,
              startDate: person.jobs[index].startDate,
              companyName: person.jobs[index].name,
              jobName: person.jobs[index].jobName,
            };
          })
        );
      } else {
        this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      }
    });
  }
}
