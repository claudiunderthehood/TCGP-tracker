import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from './models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getCollection(): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.apiUrl}/collection`);
  }

  updateCollection(collection: Card[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/collection`, collection);
  }

  getProbabilities(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/probabilities`);
  }
}
