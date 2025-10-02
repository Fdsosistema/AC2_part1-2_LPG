import { AuthService } from './../../services/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterController: ToastController
  ) {}

  async presentToast(message: string, cor: string) {
    const toast = await this.toasterController.create({
      message: message,
      color: cor,
      duration: 2000,
    });
    toast.present();
  }

  async login() {
    try {
      await this.authService.login(this.email, this.senha);
      this.router.navigateByUrl('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.presentToast('erro logando:' + error.message, 'danger');
      } else {
        this.presentToast('Erro nao conhecido', 'danger');
      }
    }
  }

  async loginGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigateByUrl('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.presentToast('erro ao logar' + error.message, 'danger');
      } else {
        this.presentToast('Erro desconhecido ao logar com google', 'danger');
      }
    }
  }

  ngOnInit() {}
}
