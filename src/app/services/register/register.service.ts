import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

export interface Register{
  password: string;
  confirmPassword: string;
  name: string;
  company: string;
  email: string;
  userType: string;
}

export interface Roles {
  reader: boolean;
  author?: Boolean;
}
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private registersCollection: AngularFirestoreCollection<Register>;
  private registers: Observable<Register[]>;
  role: Roles;

  constructor(private db: AngularFirestore) {
    this.role = {reader: true}
    this.registersCollection = db.collection<Register>('registers');

    this.registers = this.registersCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getRegisters() {
  return this.registers;
  }

  getRegister(id) {
  return this.registersCollection.doc<Register>(id).valueChanges();
  }

  updateRegister(register: Register, id: string) {
  return this.registersCollection.doc(id).update(register);
  }

  addRegister(register: Register) {
  return this.registersCollection.add(register);
  }

  removeRegister(id){
  return this.registersCollection.doc(id).delete();
  }

  }
