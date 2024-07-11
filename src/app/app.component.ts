import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
    ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  title = 'hitProjectDevSeniorTest';
  currentSection: string = 'intro';
  currentTitle: string = 'Introdução';
  apiData: { title: string, text: string } | null = null;

  constructor(
    private renderer: Renderer2,
    private dataService: DataService,
    private el: ElementRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe(response => {
      if (response.status === 'success') {
        this.apiData = response.data;
      } else {
        console.log('Nao retornou sucesso.');
      }
    });
    this.resizeLogo();
  }

  showSection(sectionId: string): void {
    const currentElement = document.querySelector('.fade-in');
    if (currentElement) {
      this.renderer.removeClass(currentElement, 'fade-in');
    }
    this.currentSection = sectionId;
    this.currentTitle = sectionId === 'intro' ? 'Introdução' : 'Contato';
    setTimeout(() => {
      const newElement = document.getElementById(sectionId);
      if (newElement) {
        this.renderer.addClass(newElement, 'fade-in');
      }
    }, 0);
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  resizeLogo(): void {
    const logo = this.el.nativeElement.querySelector('.logo');
    if (logo) {
      this.renderer.setStyle(logo, 'width', '160px');
      this.renderer.setStyle(logo, 'height', 'auto');
    }
  }

  onSubmit(): void {
    this.toastr.success('Enviado com sucesso!', 'Sucesso');
  }
}
