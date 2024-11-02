import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode'; 

@Injectable({
  providedIn: 'root'
})
export class QrimagenService {
  constructor() { }

  async generateQRCode(text: string): Promise<string> {
    try {
      const qrCodeDataURL = await QRCode.toDataURL(text, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      return qrCodeDataURL;
    } catch (err) {
      console.error('Error generando código QR:', err);
      return '';
    }
  }
}
