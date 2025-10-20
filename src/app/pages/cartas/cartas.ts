import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- ESSENCIAL PARA (ngModel)
import { CardService } from '../../services/card';
import { Card } from '../../data/tarot-cards';
import { CardItemComponent } from '../../components/card-item/card-item'; // <-- ESSENCIAL PARA <app-card-item>

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [CommonModule, CardItemComponent, FormsModule],
  templateUrl: './cartas.html',
  styleUrl: './cartas.css',
})
export class CartasComponent implements OnInit {
  searchTerm: string = '';
  allCards: Card[] = [];
  filteredCards: Card[] = [];

  constructor(private cardService: CardService) {}

  ngOnInit(): void {
    this.allCards = this.cardService.getAllCards();
    this.filteredCards = this.allCards;
  }

  onSearch(): void {
    this.filteredCards = this.cardService.getCardsByName(this.searchTerm);
  }
}
