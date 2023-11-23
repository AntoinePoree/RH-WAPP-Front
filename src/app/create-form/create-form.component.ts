import { Component, OnInit } from '@angular/core';

import {
  Validators,
  FormGroup,
  FormArray,
  FormsModule,
  FormBuilder,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Person } from '../models/person.model';
import { Job } from '../models/job.model';
import { PersonService } from '../services/person.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CreateFormComponent implements OnInit {
  personForm;
  model = new Person('1', 'Tom', 'Cruise', new Date().toString(), []);

  constructor(private fb: FormBuilder, private personService: PersonService) {
    this.personForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      birthDate: this.fb.control('', Validators.required),
      jobs: this.fb.array([this.newJob()]),
    });
  }

  get jobsForm(): FormArray {
    return this.personForm.get('jobs') as FormArray;
  }

  ngOnInit() {
    console.log(this.model);
    // todo
    this.personService.getList();
  }

  public onSubmit() {
    console.log(this.personForm);
    // todo send to server
  }

  public addJob() {
    this.jobsForm.push(this.newJob());
  }

  private newJob(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', Validators.required),
      jobName: this.fb.control('', Validators.required),
      startDate: this.fb.control('', Validators.required),
      endDate: this.fb.control(''),
    });
  }
}
