import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardService } from '../../services/card';
import { Card } from '../../data/tarot-cards';
import { CardItemComponent } from '../../components/card-item/card-item';
import { FormsModule } from '@angular/forms'; // Necessário para o Two-Way Binding do input

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardItemComponent, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit {

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