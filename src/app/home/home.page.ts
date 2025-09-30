
import { Component } from '@angular/core';

import { Dataservice, Item, Cuidador } from '../services/data';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  items: Item[] =[];
cuidadores: Cuidador[] = [];

  constructor(
    private dataService: Dataservice,
    private router:Router,
    private alertController: AlertController
  ) {}

  ngOnInit(){
    this.dataService.getItems().subscribe(res => {
      this.items = res;
    });
     this.dataService.getOwners().subscribe(res => {
      this.cuidadores = res;
    });
  }

//Pets

  addItem(){
    this.router.navigateByUrl('/page-detail')
  }

editItem(item: Item){
  this.router.navigateByUrl(`/page-detail/${item.id}`);
}

//cuidador
  addOwner(){
    this.router.navigateByUrl('/owner-detail')
  }

editOwner(cuidador: Cuidador){
  this.router.navigateByUrl(`/owner-detail/${cuidador.id}`);
}


async deleteItem(id:string){
  const alert = await this.alertController.create({
    header : 'Confirmar exclusão',
message : 'Tem certeza que deseja excluir este item?',
buttons: [

  {
    text: 'cancelar',
    role: 'cancel',
    cssClass: 'secondary',
  },
{
text : 'Excluir',
handler: () => {

  this.dataService.deleteItem(id);
  this.dataService.deleteOwner(id);

},
},
],
  });
  await alert.present();
}

}
