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
    console.log(
      new Person(
        'person.id',
        'person.lastName',
        'person.firstName',
        new Date('1997/08/19').toString(),
        []
      )
    );

    return this.http.get<IPerson[]>(`${API_BASE_URL}/persons`).pipe(
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
      catchError((err) =>
        of([
          new Person(
            'person.id',
            'person.lastName',
            'person.firstName',
            new Date('1997/08/19').toString(),
            []
          ),
        ])
      )
    );
  }

  createPerson(person: IPerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${API_BASE_URL}/person`, {
      ...person,
    });
  }
}
