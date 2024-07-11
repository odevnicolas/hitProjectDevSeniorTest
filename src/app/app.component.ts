import { Component, Renderer2, OnInit, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { ToastComponent } from './components/toast/toast.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    ToastComponent,
    ReactiveFormsModule
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
  toastMessage: string = '';
  toastType: string = 'success';
  form: FormGroup;
  showToast: boolean = false;


  constructor(
    private renderer: Renderer2,
    private dataService: DataService,
    private el: ElementRef,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: '',
      email: '',
      mensagem: ''
    });
  }

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

  Envio(event: Event): void {
    event.preventDefault();
    this.toastMessage = 'Formulário de contato enviado com sucesso!';
    this.toastType = 'success';
    this.showToast = true;
    setTimeout(() => this.showToast = false, 4000); 
  }

  async sendEmail(){
    emailjs.init('aJJls2-9RBpIVNPCe')
    let response = await emailjs.send('service_4nuxp0a','template_e4x9ap8', {
      name: this.form.value.name,
      email: this.form.value.email,
      mensagem: this.form.value.mensagem
    })
  }
}
