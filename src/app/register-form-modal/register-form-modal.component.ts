import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Keyboard } from '@capacitor/keyboard';
import { ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register-form-modal',
  templateUrl: './register-form-modal.component.html',
  styleUrls: ['./register-form-modal.component.scss'],
})
export class RegisterFormModalComponent implements OnInit {
  keyBoardShown = false;
  public contractForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCtrl: ModalController,
    private dataService:DataService
  ) {}

  ngOnInit() {
    this.initForm();
    this.shownKeyBoardSubscribtion();
  }
  ngOnDestroy(): void {
    Keyboard.removeAllListeners();
  }
  async register() {
    await this.dataService.checkIpAddress();
  }
  initForm() {
    this.contractForm = this.formBuilder.group({
      flatName: ['', Validators.required],
      intention: ['', Validators.required],
    });
  }
  shownKeyBoardSubscribtion() {
    Keyboard.addListener('keyboardWillShow', (info) => {
      this.keyBoardShown = true;
    });
    Keyboard.addListener('keyboardWillHide', () => {
      this.keyBoardShown = false;
    });
  }
  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
