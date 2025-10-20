import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../data/tarot-cards';

@Component({
  selector: 'card-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-modal.html',
  styleUrl: './card-modal.css'
})
export class CardModal {
  @Input() card!: Card;
  @Input() imagePathBase!: string;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
