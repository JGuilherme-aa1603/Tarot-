import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AiService } from '../../services/ai.service';
import { Card } from '../../data/tarot-cards';
import { MarkdownToHtmlPipe } from '../../pipes/markdown-to-html.pipe';

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [CommonModule, MarkdownToHtmlPipe],
  templateUrl: './resultado.html',
  styleUrl: './resultado.css'
})
export class ResultadoComponent implements OnInit {
  question: string = '';
  selectedCards: Card[] = [];
  reading: string = '';
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private router: Router,
    private aiService: AiService,
    private cdr: ChangeDetectorRef
  ) {
    // Obter dados passados pela navegação
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { question: string; cards: Card[] };
    
    if (state) {
      this.question = state.question;
      this.selectedCards = state.cards;
    } else {
      // Se não houver dados, redirecionar para home
      this.router.navigate(['/']);
    }
  }

  async ngOnInit() {
    if (this.question && this.selectedCards.length === 3) {
      await this.generateReading();
    }
  }

  async generateReading() {
    try {
      this.isLoading = true;
      this.error = '';
      this.cdr.detectChanges();
      
      // Chamar o serviço de IA
      this.reading = await this.aiService.generateReading(this.question, this.selectedCards);
      
      this.isLoading = false;
      this.cdr.detectChanges();
      
    } catch (error: any) {
      console.error('Erro ao gerar leitura:', error);
      this.isLoading = false;
      this.error = error.message || 'Erro ao gerar leitura. Tente novamente.';
      this.cdr.detectChanges();
    }
  }

  onNewReading() {
    // Voltar para a home para fazer nova leitura
    this.router.navigate(['/']);
  }

  getCardPosition(index: number): string {
    return ['Passado', 'Presente', 'Futuro'][index];
  }
}
