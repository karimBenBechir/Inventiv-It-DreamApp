import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import axios from 'axios';
const toastController = new ToastController();

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  shynleiFirstList: textIconType[] = [
    {
      text: "1. Le rêve liber l'expression",
      iconUrl: 'assets/images/Page-1.svg',
    },

    {
      text: '3. La différence rend unique',
      iconUrl: 'assets/images/Page-3.svg',
    },
    { text: '5. La clé exprime le style', iconUrl: 'assets/images/Page-5.svg' },
    {
      text: "7. Le ciel bleu révèle l'alignement",
      iconUrl: 'assets/images/Page-7.svg',
    },
  ];
  shynleiSecondList: textIconType[] = [
    {
      text: '2. Le sens éclaire le parcours',
      iconUrl: 'assets/images/Page-2.svg',
    },
    {
      text: '4. La valeur humaine met en mouvement',
      iconUrl: 'assets/images/Page-4.svg',
    },

    {
      text: '6. Le parcours associe rêve et réalité',
      iconUrl: 'assets/images/Page-6.svg',
    },
  ];

  constructor() {}

  getFirstShynlei(): textIconType[] {
    return this.shynleiFirstList;
  }
  getSecondshynlei(): textIconType[] {
    return this.shynleiSecondList;
  }

  async checkIpAddress() {
    return new Promise<ipAdressDataType>(async (resolve, reject) => {
      try {
        const options = {
          url: 'https://api.db-ip.com/v2/free/self',
          method: 'GET',
        };
        const response = await axios(options);
        if (response.status === 200) {
          const data: string = response.data.ipAddress;
          this.validateIpAdress(data);
          resolve(response.data);
        }
        if (response.data.status === 500) {
          this.presentToast(
            "Une erreur technique s'est produite, veuillez contacter le service technique."
          );
          reject();
        }
      } catch (error) {
        this.presentToast(
          "Une erreur technique s'est produite, veuillez contacter le service technique."
        );
        reject(error);
      }
    });
  }
  validateIpAdress(ipAdressParam: string) {
    const ipAdressParts = ipAdressParam.split('.').map(function (item) {
      return parseInt(item, 10);
    });
    const sumResult = ipAdressParts.reduce((curr, next) => curr + next);
    const alertMessage = sumResult > 100 ? 'OK' : 'KO';
    this.presentToast(alertMessage);
  }

  presentToast = async (param: any) => {
    const toast = await toastController.create({
      message: param,
      duration: 2500,
      position: 'top',
      cssClass: 'confirmationToast',
      translucent: true,
      animated: true,
      icon: 'checkmark-circle',
    });
    toast.present();
  };
}

export interface textIconType {
  text: string;
  iconUrl: string;
}
export interface ipAdressDataType {
  city: string;

  continentCode: string;

  continentName: string;

  countryCode: string;

  countryName: string;

  ipAddress: string;

  stateProv: string;
}
