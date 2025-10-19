import { Injectable } from '@angular/core';
import { Card, TAROT_CARDS } from '../data/tarot-cards';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private allCards: Card[] = TAROT_CARDS;

  constructor() { }

  getAllCards(): Card[] {
    return this.allCards;
  }

  getCardsByName(searchTerm: string): Card[] {
    if (!searchTerm) {
      return this.allCards;
    }
    const term = searchTerm.toLowerCase();
    return this.allCards.filter(card => 
      card.name.toLowerCase().includes(term) ||
      card.description.toLowerCase().includes(term)
    );
  }
}