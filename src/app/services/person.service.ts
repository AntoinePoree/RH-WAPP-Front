import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IPerson, Person } from '../models/person.model';
import { ELEMENT_DATA } from './mock';

const API_BASE_URL = 'https://api';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getList(): Observable<Person[]> {
    return this.http.get<IPerson[]>(`${API_BASE_URL}/external-users`).pipe(
      map((persons) =>
        persons.map(
          (person) =>
            new Person(
              person.id,
              person.lastName,
              person.firstName,
              person.birthDate,
              person.jobs
            )
        )
      ),
      catchError((err) => of([]))
    );
  }
}
