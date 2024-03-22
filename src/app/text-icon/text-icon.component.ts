import { Component, Input, OnInit, inject } from '@angular/core';
import { Platform } from '@ionic/angular';
import { textIconType } from '../services/data.service';

@Component({
  selector: 'app-text-icon',
  templateUrl: './text-icon.component.html',
  styleUrls: ['./text-icon.component.scss'],
})
export class TextIconComponent implements OnInit {
  private platform = inject(Platform);
  @Input() itemContent!: textIconType;
  constructor() {}

  ngOnInit() {}
  isIos() {
    return this.platform.is('ios');
  }

}

