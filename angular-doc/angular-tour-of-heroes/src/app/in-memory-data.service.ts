import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const heroes = [
      { id: 1, name: 'Alfa' },
      { id: 2, name: 'Bravo' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Delta' },
      { id: 5, name: 'Echo' },
      { id: 6, name: 'Foxtrot' },
      { id: 7, name: 'Golf' },
      { id: 8, name: 'Hotel' },
      { id: 9, name: 'India' },
      { id: 10, name: 'Juliett' },
    ];
    return { heroes };
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0
      ? Math.max(...heroes.map((hero) => hero.id)) + 1
      : 1;
  }
}
