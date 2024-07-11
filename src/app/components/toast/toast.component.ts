import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true, // Torna o componente standalone
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="toast" [ngClass]="type">
      {{ message }}
    </div>
  `,
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  @Input() type: string = 'success';
  show: boolean = false;

  ngOnInit(): void {
    this.show = true;
    setTimeout(() => this.show = false, 3000); // Exibir por 3 segundos
  }
}
