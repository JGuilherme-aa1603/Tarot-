import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CardService } from '../../services/card';
import { Card } from '../../data/tarot-cards';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  question: string = '';
  showCardSelection: boolean = false;
  allCards: Card[] = [];
  selectedCards: Card[] = [];
  isShuffling: boolean = false;
  shuffleCount: number = 0;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.allCards = this.cardService.getAllCards();
    // Embaralhar as cartas automaticamente ao carregar
    this.shuffleCardsAutomatic();
  }

  onContinue() {
    if (this.question.trim().length > 0) {
      this.showCardSelection = true;
      // Embaralhar novamente quando exibir a seleção de cartas
      this.shuffleCardsAutomatic();
    }
  }

  selectCard(card: Card) {
    const index = this.selectedCards.findIndex((c) => c.id === card.id);

    if (index > -1) {
      // Carta já selecionada, remover
      this.selectedCards.splice(index, 1);
    } else if (this.selectedCards.length < 3) {
      // Adicionar carta se ainda não tiver 3
      this.selectedCards.push(card);
    }
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCards.some((c) => c.id === card.id);
  }

  getSelectionOrder(card: Card): number {
    const index = this.selectedCards.findIndex((c) => c.id === card.id);
    return index > -1 ? index + 1 : 0;
  }

  onViewResult() {
    // Navegar para tela de resultado passando dados via state
    this.router.navigate(['/resultado'], {
      state: {
        question: this.question,
        cards: this.selectedCards,
      },
    });
  }

  shuffleCards() {
    this.isShuffling = true;
    this.shuffleCount++;

    // Embaralhar o array de cartas usando Fisher-Yates
    setTimeout(() => {
      const shuffled = [...this.allCards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      this.allCards = shuffled;

      // Desabilitar animação após 1 segundo
      setTimeout(() => {
        this.isShuffling = false;
      }, 1000);
    }, 100);
  }

  /**
   * Embaralha as cartas automaticamente sem animação visível
   */
  private shuffleCardsAutomatic() {
    const shuffled = [...this.allCards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.allCards = shuffled;
  }
}
