import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ESSENCIAL PARA (ngModel)
import { CardService } from '../../services/card';
import { Card } from '../../data/tarot-cards';
import { CardItemComponent } from '../../components/card-item/card-item'; // <-- ESSENCIAL PARA <app-card-item>

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardItemComponent, FormsModule], // <-- FormsModule E CardItemComponent
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

  searchTerm: string = ''; // <-- Variável searchTerm (resolvendo TS2339)
  allCards: Card[] = [];
  filteredCards: Card[] = []; // <-- Variável filteredCards (resolvendo TS2339)

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.allCards = this.cardService.getAllCards();
    this.filteredCards = this.allCards;
  }

  onSearch(): void { // <-- Método onSearch (resolvendo TS2339)
    this.filteredCards = this.cardService.getCardsByName(this.searchTerm);
  }
}