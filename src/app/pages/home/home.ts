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
  template: `
    <div class="landing">
      @if (!showCardSelection) {
        <h1>Bem-vindo ao Tarô</h1>
        <p>Faça sua pergunta e escolha 3 cartas para revelar sua resposta.</p>
        
        <div class="question-container">
          <input 
            type="text" 
            [(ngModel)]="question"
            placeholder="Digite sua pergunta aqui..."
            class="question-input"
            maxlength="200"
          />
          <p class="hint">Concentre-se na sua pergunta antes de escolher as cartas</p>
          
          @if (question.trim().length > 0) {
            <button class="continue-btn" (click)="onContinue()">
              Continuar
            </button>
          }
        </div>

        <a href="/cartas" class="link">Conheça as Cartas</a>
      }

      @if (showCardSelection) {
        <div class="selection-container">
          <h2>Escolha 3 cartas</h2>
          <p class="question-display">"{{ question }}"</p>
          <p class="selection-hint">Cartas selecionadas: {{ selectedCards.length }}/3</p>

          <button 
            class="shuffle-btn" 
            (click)="shuffleCards()"
            [disabled]="isShuffling"
          >
            {{ isShuffling ? 'Embaralhando...' : 'Embaralhar Cartas' }}
          </button>

          <div class="card-grid" [class.shuffling]="isShuffling">
            @for (card of allCards; track card.id) {
              <div 
                class="card-item"
                [class.selected]="isCardSelected(card)"
                [class.disabled]="selectedCards.length >= 3 && !isCardSelected(card)"
                [class.shuffle-animation]="isShuffling"
                (click)="selectCard(card)"
              >
                <img src="tarot/verso.jpg" alt="Verso da carta" />
                @if (isCardSelected(card)) {
                  <div class="selection-badge">{{ getSelectionOrder(card) }}</div>
                }
              </div>
            }
          </div>

          @if (selectedCards.length === 3) {
            <button class="result-btn" (click)="onViewResult()">
              Ver Resultado
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [
    `
      .landing {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        text-align: center;
        padding: 40px 20px;
      }
      .landing h1 {
        font-size: 42px;
        font-weight: 300;
        margin-bottom: 15px;
        color: #f0f0f0;
      }
      .landing > p {
        font-size: 18px;
        color: #ccc;
        margin-bottom: 40px;
      }
      .question-container {
        width: 100%;
        max-width: 600px;
        margin-bottom: 30px;
      }
      .question-input {
        width: 100%;
        padding: 18px 24px;
        font-size: 18px;
        border: 2px solid #3b3b5e;
        border-radius: 12px;
        background-color: #2a2a3e;
        color: #f0f0f0;
        outline: none;
        transition: border-color 0.3s;
        box-sizing: border-box;
      }
      .question-input:focus {
        border-color: #6b6b8e;
      }
      .question-input::placeholder {
        color: #888;
      }
      .hint {
        font-size: 14px;
        color: #999;
        margin-top: 10px;
        font-style: italic;
      }
      .continue-btn {
        margin-top: 20px;
        padding: 14px 40px;
        font-size: 18px;
        font-weight: 500;
        background: linear-gradient(135deg, #6b6b8e 0%, #4a4a6e 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(107, 107, 142, 0.3);
      }
      .continue-btn:hover {
        background: linear-gradient(135deg, #7b7b9e 0%, #5a5a7e 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(107, 107, 142, 0.4);
      }
      .continue-btn:active {
        transform: translateY(0);
      }
      .link {
        color: #8b8bcc;
        text-decoration: none;
        font-size: 16px;
        margin-top: 20px;
        transition: color 0.3s;
      }
      .link:hover {
        color: #afafdd;
        text-decoration: underline;
      }
      .selection-container {
        width: 100%;
        max-width: 1200px;
        padding: 20px;
      }
      .selection-container h2 {
        font-size: 32px;
        font-weight: 300;
        margin-bottom: 15px;
        color: #f0f0f0;
        text-align: center;
      }
      .question-display {
        font-size: 20px;
        color: #8b8bcc;
        margin-bottom: 10px;
        text-align: center;
        font-style: italic;
      }
      .selection-hint {
        font-size: 16px;
        color: #ccc;
        margin-bottom: 30px;
        text-align: center;
      }
      .shuffle-btn {
        display: block;
        margin: 0 auto 30px;
        padding: 12px 30px;
        font-size: 16px;
        font-weight: 500;
        background: linear-gradient(135deg, #8b8bcc 0%, #6b6b9e 100%);
        color: #fff;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(139, 139, 204, 0.3);
      }
      .shuffle-btn:hover:not(:disabled) {
        background: linear-gradient(135deg, #9b9bdc 0%, #7b7bae 100%);
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(139, 139, 204, 0.4);
      }
      .shuffle-btn:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .card-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 15px;
        margin-bottom: 30px;
      }
      .card-item {
        position: relative;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 3px solid transparent;
        opacity: 0.8;
      }
      .card-item:hover {
        transform: translateY(-5px);
        opacity: 1;
        box-shadow: 0 8px 20px rgba(107, 107, 142, 0.4);
      }
      .card-item.selected {
        border-color: #6b6b8e;
        opacity: 1;
        transform: scale(1.05);
      }
      .card-item.disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
      .card-item.disabled:hover {
        transform: none;
      }
      .card-item.shuffle-animation {
        animation: shuffle 0.6s ease-in-out;
      }
      @keyframes shuffle {
        0% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(-10px) rotate(-5deg);
        }
        75% {
          transform: translateY(-15px) rotate(3deg);
        }
        100% {
          transform: translateY(0) rotate(0deg);
        }
      }
      .card-item img {
        width: 100%;
        height: auto;
        display: block;
      }
      .selection-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        background: #6b6b8e;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 16px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
      }
      .result-btn {
        display: block;
        margin: 30px auto 0;
        padding: 16px 50px;
        font-size: 20px;
        font-weight: 600;
        background: linear-gradient(135deg, #6b6b8e 0%, #4a4a6e 100%);
        color: #fff;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(107, 107, 142, 0.4);
      }
      .result-btn:hover {
        background: linear-gradient(135deg, #7b7b9e 0%, #5a5a7e 100%);
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(107, 107, 142, 0.5);
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  question: string = '';
  showCardSelection: boolean = false;
  allCards: Card[] = [];
  selectedCards: Card[] = [];
  isShuffling: boolean = false;
  shuffleCount: number = 0;

  constructor(
    private cardService: CardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.allCards = this.cardService.getAllCards();
  }

  onContinue() {
    if (this.question.trim().length > 0) {
      this.showCardSelection = true;
    }
  }

  selectCard(card: Card) {
    const index = this.selectedCards.findIndex(c => c.id === card.id);
    
    if (index > -1) {
      // Carta já selecionada, remover
      this.selectedCards.splice(index, 1);
    } else if (this.selectedCards.length < 3) {
      // Adicionar carta se ainda não tiver 3
      this.selectedCards.push(card);
    }
  }

  isCardSelected(card: Card): boolean {
    return this.selectedCards.some(c => c.id === card.id);
  }

  getSelectionOrder(card: Card): number {
    const index = this.selectedCards.findIndex(c => c.id === card.id);
    return index > -1 ? index + 1 : 0;
  }

  onViewResult() {
    // Navegar para tela de resultado passando dados via state
    this.router.navigate(['/resultado'], {
      state: {
        question: this.question,
        cards: this.selectedCards
      }
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
}
