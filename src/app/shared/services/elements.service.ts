import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodicElement } from '../../models/periodic-element.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ElementsService {
  private url = 'http://localhost:3000/periodicElements';

  constructor(private http: HttpClient) { }

  getElements(): Observable<PeriodicElement[]> {
    return this.http.get<PeriodicElement[]>(this.url);
  }
}
