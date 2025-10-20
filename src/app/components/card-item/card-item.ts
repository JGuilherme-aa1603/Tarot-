import { Component, Input } from '@angular/core'; 
import { Card } from '../../data/tarot-cards';
import { CommonModule } from '@angular/common';
import { CardModal } from '../card-modal/card-modal';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule, CardModal],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css'
})
export class CardItemComponent {
  
  @Input({ required: true }) card!: Card;
  
  imagePathBase = 'tarot/';
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}