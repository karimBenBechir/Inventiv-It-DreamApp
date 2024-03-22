import { Component, OnInit, inject } from '@angular/core';
import {
  DataService,
  textIconType,
} from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, Platform } from '@ionic/angular';
import { RegisterFormModalComponent } from '../register-form-modal/register-form-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private data = inject(DataService);
  public contractForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private plateform: Platform,
    private modalController: ModalController
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.contractForm = this.formBuilder.group({
      flatName: ['', Validators.required],
      intention: ['', Validators.required],
    });
  }
  async register() {
    !this.isLaptopView() && this.presentFormModal();
    this.isLaptopView() && (await this.data.checkIpAddress());
  }
  getshynleiSteps(): textIconType[] {
    return this.data.getFirstShynlei();
  }
  getshynleiSteps2(): textIconType[] {
    return this.data.getSecondshynlei();
  }
  nextClicked(event: any, element: any) {
    if (event.keyCode === 13) {
      element.setFocus();
    }
  }
  isLaptopView() {
    const isWideSreen = this.plateform.width() > 768;
    return isWideSreen;
  }
  formValidation() {
    let result = true;
    switch (this.isLaptopView()) {
      case true:
        {
          this.contractForm.valid && (result = false);
          !this.contractForm.valid && (result = true);
        }
        break;
      default:
        {
          result = false;
        }
        break;
    }
    return result;
  }
  async presentFormModal() {
    const modal = await this.modalController.create({
      component: RegisterFormModalComponent,
      cssClass: 'creationFormModal',
      backdropDismiss: false,
    });
    await modal.present();
  }
}
