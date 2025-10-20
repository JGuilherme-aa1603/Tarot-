import { Component, Input } from '@angular/core'; 
import { Card } from '../../data/tarot-cards';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css'
})
export class CardItemComponent {
  
  @Input({ required: true }) card!: Card;
  
  imagePathBase = 'tarot/';
}