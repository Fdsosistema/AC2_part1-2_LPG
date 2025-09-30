import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Dataservice,Item } from 'src/app/services/data';
import { LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-page-detail',
  templateUrl: './page-detail.page.html',
  styleUrls: ['./page-detail.page.scss'],
  standalone: false,
})
export class PageDetailPage implements OnInit {

  item: Item = {
      name: '',
  raca: '',
  especie: '',
  idade: '',
  obeservacoesIniciais: '',
  };

  itemId: string | null = null;
  isNewItem = true;


  constructor(private route: ActivatedRoute, private dataService: Dataservice, private router: Router,
    private loadingController: LoadingController, private toastcontroller: ToastController) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');

    if (this.itemId) {
      this.isNewItem = false;
this.loadItem();
    }
  }


  async loadItem() {
    const loading = await this.loadingController.create({
      message: 'carregando item...'
    });

    await loading.present();

    this.dataService.getItem(this.itemId!).subscribe(res => {
      loading.dismiss();
      if (res) {
        this.item = res;
      } else {
        this.presentToast('item nao encontrado!', 'danger');
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
      message: 'salvando Item...'
    });
    await loading.present();

    if (this.isNewItem){
      this.dataService.addItem(this.item).then(() => {
        loading.dismiss();
        this.presentToast('item adicionado com sucesso!', 'sucesso');
        this.router.navigateByUrl('/home');

      }, err => {
        loading.dismiss();
        this.presentToast('erro ao adicionar item.' , 'danger');
      });
    } else {
      this.dataService.updateItem(this.item).then(() => {
        loading.dismiss();
        this.presentToast('item atualizado com sucesso', 'sucess');
        this.router.navigateByUrl('/home');
      }, err => {
        loading.dismiss();
        this.presentToast('erro ao atualizar item', 'danger');
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
