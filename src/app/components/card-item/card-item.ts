import { Component, Input } from '@angular/core'; // IMPORTAÇÃO ÚNICA do core
import { Card } from '../../data/tarot-cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss'
})
export class CardItemComponent {
  
  // Define o Input que receberá os dados da carta da página Home
  @Input({ required: true }) card!: Card;
  
  // Base do caminho das imagens (usado no template HTML)
  imagePathBase = 'assets/images/tarot/';
}