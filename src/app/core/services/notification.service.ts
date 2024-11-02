import { Injectable } from '@angular/core';
import { IReturn } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }


  Return(oreturn: IReturn) {
    if (oreturn.success) {
      this.bigBox({
        title: "Excelente Trabajo",
        content: oreturn.message,
        number: oreturn.argument,
        color: "#739E73",
        timeout: 7000,
        icon: "fa fa-check fadeInLeft animated"
      });
    } else {

      this.bigBox({
        title: "¿Qué pasó?",
        content: oreturn.message,
        number: oreturn.argument,
        color: "#C79121",
        timeout: 7000,
        icon: "fa fa-check fadeInLeft animated"
      });
    }
  }

  Success(message: string) {
    this.smallBox({
      title: "Mensaje de Exito ",
      content: message,
      color: "#739E73",
      timeout: 7000,
      icon: "fa fa-check fadeInLeft animated"
    });
  }

  Info(message: string) {
    this.smallBox({
      title: "Mensaje Informativo ",
      content: message,
      color: "#5384AF",
      timeout: 7000,
      icon: "fa fa-check fadeInLeft animated"
    });
  }

  Warning(message: string) {
    this.smallBox({
      title: "Mensaje de Advertencia ",
      content: message,
      color: "#C79121",
      timeout: 7000,
      icon: "fa fa-check fadeInLeft animated"
    });
  }

  Error(message: string) {
    this.smallBox({
      title: "Mensaje de Error ",
      content: message,
      color: "#C46A69",
      timeout: 7000,
      icon: "fa fa-check fadeInLeft animated"
    });
  }



  Confirm(message:string, title = "Confirmación") {
    return new Promise((resolve) => {
      const confirmacion = window.confirm(message);
      resolve(confirmacion);
    })
  }



  






  private smallBox(options: any): void {
    // Obtener el contenedor principal
    let container = document.getElementById('divSmallBoxes');
    let countSmallBox = document.querySelectorAll('div.SmallBox').length;

    // Si el contenedor no existe, crearlo y añadirlo al body
    if (!container) {
      container = document.createElement('div');
      container.id = 'divSmallBoxes';
      document.body.appendChild(container);
    }

    // Crear el nuevo mensaje
    const smallBox = document.createElement('div');
    smallBox.id = 'smallBox' + (countSmallBox + 1).toString();
    smallBox.className = 'SmallBox animated fadeInRight fast';
    smallBox.style.backgroundColor = options.color;



    smallBox.style.top = ((countSmallBox * 110) + 20).toString() + 'px';

    const foto = document.createElement('div');
    foto.className = 'foto';
    const icon = document.createElement('i');
    icon.className = options.icon;
    foto.appendChild(icon);

    const textoFoto = document.createElement('div');
    textoFoto.className = 'textoFoto';
    const titleElement = document.createElement('span');
    titleElement.textContent = options.title;
    const messageElement = document.createElement('p');
    messageElement.textContent = options.content;
    textoFoto.appendChild(titleElement);
    textoFoto.appendChild(messageElement);

    const miniIcono = document.createElement('div');
    miniIcono.className = 'miniIcono';

    // Añadir todos los elementos al smallBox
    smallBox.appendChild(foto);
    smallBox.appendChild(textoFoto);
    smallBox.appendChild(miniIcono);

    // Añadir el smallBox al contenedor principal
    container.appendChild(smallBox);

    this.removeElement(smallBox, options.timeout)
  }
  private bigBox(options: any): void {
    // Obtener los contenedores o crearlos si no existen
    let bigBoxContainer = document.getElementById('divbigBoxes');
    let miniIconsContainer = document.getElementById('divMiniIcons');

    if (!bigBoxContainer) {
      bigBoxContainer = document.createElement('div');
      bigBoxContainer.id = 'divbigBoxes';
      document.body.appendChild(bigBoxContainer);
    }

    if (!miniIconsContainer) {
      miniIconsContainer = document.createElement('div');
      miniIconsContainer.id = 'divMiniIcons';
      document.body.appendChild(miniIconsContainer);
    }

    // Crear el mini icono y agregarlo al contenedor divMiniIcons
    const miniIcon = document.createElement('div');
    miniIcon.className = 'cajita animated fadeIn';
    miniIcon.style.backgroundColor = options.color;
    miniIcon.innerHTML = `<i class="${options.icon}"></i>`;
    miniIconsContainer.appendChild(miniIcon);

    // Crear el mensaje bigBox y agregarlo al contenedor divbigBoxes
    const bigBox = document.createElement('div');
    bigBox.className = 'bigBox animated fadeIn fast';
    bigBox.style.backgroundColor = options.color;
    bigBox.style.zIndex = '9999';

    const bigBoxContent =
      `<div class="animated fadeIn">
         <i class="botClose fa fa-times"></i>
         <span>${options.title}</span>
         <p>${options.content}</p>
         <div class="bigboxicon"><i class="${options.icon}"></i></div>
         <div class="bigboxnumber"></div>
     </div>`;

    bigBox.innerHTML = bigBoxContent;
    bigBoxContainer.appendChild(bigBox);

    this.removeElement(miniIcon, options.timeout)
    this.removeElement(bigBox, options.timeout)
  }
  private removeElement(element: HTMLElement, delay: number = 2000): void {
    // Asegúrate de que el elemento tiene la clase 'fade-out' antes de eliminarlo
    if (element) {
      element.classList.add('fade-out');

      // Usar un listener para la transición de salida
      element.addEventListener('transitionend', () => {
        // Eliminar el elemento del DOM
        element.remove();
      }, { once: true }); // { once: true } asegura que el listener se ejecute solo una vez

      // También puedes usar un timeout como respaldo en caso de que la transición no funcione
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      }, delay);
    }
  }
}
