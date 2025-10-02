
import { AuthService } from './../../services/auth';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false,
})
export class RegisterPage   {

   email = '';
  senha = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  async presentToast(message: string, cor: string) {
    const toast = await this.toasterController.create({
      message: message,
      color: cor,
      duration: 2000,
    });
    toast.present();
  }

async cadastrar(){
  const loading = await this.loadingCtrl.create({message: 'Cadastrando'}  );
    await loading.present();

    try {
      await this.authService.register(this.email, this.senha);
      await loading.dismiss();
      this.presentToast('cadastro realizado', 'success');
      this.router.navigateByUrl('/login');

    } catch (error: any) {
      await loading.dismiss();
      this.presentToast(' erro ao cadastrar ' + error.message, 'danger');

    }

}

}
