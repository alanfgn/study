import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(private messageService: MessageService) {}

  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('Hero Service: fetched heroes');
    return heroes;
  }

  getHero(id: Number): Observable<Hero> {
    const hero = HEROES.find((h) => h.id === id) as Hero;
    this.messageService.add(`Hero Service: fetched heroes id=${hero.id}`);
    return of(hero);
  }
}