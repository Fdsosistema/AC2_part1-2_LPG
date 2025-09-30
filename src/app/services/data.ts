
import { Injectable } from '@angular/core';

import{
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from '@angular/fire/firestore'
import { Observable } from 'rxjs';

export interface Item {
  id? : string;
  name: string;
  raca: string;
  especie: string;
  idade:string;
  obeservacoesIniciais: string;
  createdAt?:number;
}

export interface Cuidador {
  id? : string;
  name: string;
  telefone:string;
experience:string;
expecialidade: string;
  createdAt?:number;
}


@Injectable({
  providedIn: 'root'
})

export class Dataservice {
  constructor(private firestore:Firestore){
  }

//Pets

  getItems(): Observable<Item[]> {
    const itemsCollectionRef = collection(this.firestore, 'items');
    const q = query(itemsCollectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id'}) as Observable<Item[]>;
  };

  getItem(id:string): Observable<Item|undefined> {
    const itemDocRef = doc(this.firestore, `items/${id}`)
    return docData(itemDocRef, {idField: 'id'}) as Observable<Item| undefined>;
  };

  addItem(item: Item){
    const itemsCollectionRef = collection(this.firestore, 'items');
    return addDoc(itemsCollectionRef, {...item, createdAt: Date.now()});
  };

    updateItem(item: Item){
    const itemDocRef = doc(this.firestore, `items/${item.id}`);
    return updateDoc(itemDocRef, {name: item.name, raca: item.raca, especie: item.especie, idade: item.idade, obeservacoesIniciais: item.obeservacoesIniciais});
  };

    deleteItem(id:string){
    const itemDocRef = doc(this.firestore, `items/${id}`);
    return deleteDoc(itemDocRef);
  };

//Cuidadores

  getOwners(): Observable<Cuidador[]> {
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    const q = query(cuidadoresCollectionRef, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id'}) as Observable<Cuidador[]>;
  };

  getOwner(id:string): Observable<Cuidador|undefined> {
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`)
    return docData(cuidadorDocRef, {idField: 'id'}) as Observable<Cuidador| undefined>;
  };

  addOwner(cuidador: Cuidador){
    const cuidadoresCollectionRef = collection(this.firestore, 'cuidadores');
    return addDoc(cuidadoresCollectionRef, {...cuidador, createdAt: Date.now()});
  };

    updateOwner(cuidador: Cuidador){
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${cuidador.id}`);
    return updateDoc(cuidadorDocRef, {name: cuidador.name, telefone: cuidador.telefone, experience: cuidador.experience, expecialidade: cuidador.expecialidade});
  };

    deleteOwner(id:string){
    const cuidadorDocRef = doc(this.firestore, `cuidadores/${id}`);
    return deleteDoc(cuidadorDocRef);
  };


}

export class Data {

}
