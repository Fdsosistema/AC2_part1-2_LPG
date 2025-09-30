
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Dataservice,Cuidador } from 'src/app/services/data';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.page.html',
  styleUrls: ['./owner-detail.page.scss'],
  standalone: false,
})
export class OwnerDetailPage implements OnInit {


  cuidador: Cuidador = {
        name: '',
   telefone: '',
   expecialidade:'',
   experience:'',
    };

    cuidadorID: string | null = null;
    isNewItem = true;


  constructor(private route: ActivatedRoute, private dataService: Dataservice, private router: Router,
    private loadingController: LoadingController, private toastcontroller: ToastController) { }

  ngOnInit() {
    this.cuidadorID = this.route.snapshot.paramMap.get('id');

    if (this.cuidadorID) {
      this.isNewItem = false;
this.loadItem();
    }
  }


  async loadItem() {
    const loading = await this.loadingController.create({
      message: 'carregando...'
    });

    await loading.present();

    this.dataService.getOwner(this.cuidadorID!).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.cuidador=res
      } else {
        this.presentToast('Item nao encontrado!', 'danger');
        this.router.navigateByUrl('/home')
      }
    }, err => {
      loading.dismiss();
      this.presentToast('erro ao carregar item.', 'danger');
      this.router.navigateByUrl('/home');
    });
  }




  async saveItem(){
    const loading = await this.loadingController.create({
      message: 'salvando...'
    });
    await loading.present();

    if (this.isNewItem){
      this.dataService.addOwner(this.cuidador).then(() => {
        loading.dismiss();
        this.presentToast('cuidador adicionado', 'sucesso');
        this.router.navigateByUrl('/home');

      }, err => {
        loading.dismiss();
        this.presentToast('erro ao adicionar Pet.' , 'danger');
      });
    } else {
      this.dataService.updateOwner(this.cuidador).then(() => {
        loading.dismiss();
        this.presentToast('Dados atualizados', 'sucess');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.presentToast('erro ao atualizar', 'danger');
      });
    }
  }


  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastcontroller.create({
      message: message,
      duration: 2000,
      color: color
    });
    toast.present();
  }

}
