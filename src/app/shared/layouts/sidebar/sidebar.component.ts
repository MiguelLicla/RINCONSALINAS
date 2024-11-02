import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MenuItem } from './menu.model';
import { NavigationEnd, Router } from '@angular/router';
import { MENU } from './menu';
import { StorageService } from '../../../core/services';
import { IAuthOpcion } from '../../../models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  menuItems: MenuItem[] = [];
  isCollapsed = false;
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  @Output() mobileMenuButtonClicked = new EventEmitter();
  authOpcion!: IAuthOpcion[];
  constructor(private router: Router, private storageService: StorageService) {

    this.authOpcion = this.storageService.leerAuth().opciones;
  }


  ngOnInit(): void {



    this.authOpcion.filter(p => p.idPadre == 0).forEach(item => {
      this.menuItems = [...this.menuItems, { id: item.idOpcion, label: item.nombre, icon: item.icono, link: item.controller, subItems: [] }]
    });

    this.authOpcion.filter(p => p.idPadre > 0).forEach(item => {
      let menu = this.menuItems.filter(p => p.id == item.idPadre)[0];
      menu.subItems = [...menu.subItems, { id: item.idOpcion, label: item.nombre, icon: item.icono, link: item.controller }]
    });

    console.log(this.menuItems)
    // id: 8,
    // label: 'Visitantes',
    // icon: 'las la-flask',
    // link: '/visitantes'
    // Menu Items
    //this.menuItems = MENU;
    // this.router.events.subscribe((event) => {
    //   if (document.documentElement.getAttribute('data-layout') != "twocolumn") {
    //     if (event instanceof NavigationEnd) {
    //       this.initActiveMenu();
    //     }
    //   }
    // });
  }

  addMenuSubItems(item: IAuthOpcion) {


  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initActiveMenu();
    }, 0);
  }

  onObtenerHijos(idOpcion: number) {
    return this.authOpcion.filter(p => p.idPadre == idOpcion).length > 0;
  }

  removeActivation(items: any) {
    items.forEach((item: any) => {
      item.classList.remove("active");

    });

  }
  toggleItem(item: any) {
    this.menuItems.forEach((menuItem: any) => {

      if (menuItem == item) {
        menuItem.isCollapsed = !menuItem.isCollapsed


      } else {
        menuItem.isCollapsed = true
      }
      if (menuItem.subItems) {
        menuItem.subItems.forEach((subItem: any) => {

          if (subItem == item) {
            menuItem.isCollapsed = !menuItem.isCollapsed
            subItem.isCollapsed = !subItem.isCollapsed
          } else {
            subItem.isCollapsed = true
          }
          if (subItem.subItems) {
            subItem.subItems.forEach((childitem: any) => {

              if (childitem == item) {
                childitem.isCollapsed = !childitem.isCollapsed
                subItem.isCollapsed = !subItem.isCollapsed
                menuItem.isCollapsed = !menuItem.isCollapsed
              } else {
                childitem.isCollapsed = true
              }
              if (childitem.subItems) {
                childitem.subItems.forEach((childrenitem: any) => {

                  if (childrenitem == item) {
                    childrenitem.isCollapsed = false
                    childitem.isCollapsed = false
                    subItem.isCollapsed = false
                    menuItem.isCollapsed = false
                  } else {
                    childrenitem.isCollapsed = true
                  }
                })
              }
            })
          }
        })
      }

    });



  }

  removeDisplay() {

    const menuDropdownElements = document.querySelectorAll('.menu-dropdown');
    setTimeout(() => {
      menuDropdownElements.forEach(element => {
        (element as HTMLElement).style.cssText = '';
      });

    }, 0);

  }


  activateParentDropdown(item: any) {
    item.classList.add("active");
    let parentCollapseDiv = item.closest(".collapse.menu-dropdown");




    if (parentCollapseDiv) {
      // to set aria expand true remaining
      parentCollapseDiv.classList.add("show");
      parentCollapseDiv.parentElement.children[0].classList.add("active");
      parentCollapseDiv.parentElement.children[0].setAttribute("aria-expanded", "true");
      if (parentCollapseDiv.parentElement.closest(".collapse.menu-dropdown")) {
        parentCollapseDiv.parentElement.closest(".collapse").classList.add("show");
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling)
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.classList.add("active");
        if (parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse")) {
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").classList.add("show");
          parentCollapseDiv.parentElement.closest(".collapse").previousElementSibling.closest(".collapse").previousElementSibling.classList.add("active");
        }
      }
      return false;
    }
    return false;
  }
  updateActive(event: any) {
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      this.removeActivation(items);
    }
    this.activateParentDropdown(event.target);
  }
  initActiveMenu() {
    let pathName = window.location.pathname;
    // Check if the application is running in production
    // if (environment.production) {
    //   // Modify pathName for production build
    //   pathName = pathName.replace('/velzon/angular/modern', '');
    // }

    const active = this.findMenuItem(pathName, this.menuItems)
    this.toggleItem(active)
    const ul = document.getElementById("navbar-nav");
    if (ul) {
      const items = Array.from(ul.querySelectorAll("a.nav-link"));
      let activeItems = items.filter((x: any) => x.classList.contains("active"));
      this.removeActivation(activeItems);

      let matchingMenuItem = items.find((x: any) => {
        // if (environment.production) {
        //   let path = x.pathname
        //   path = path.replace('/velzon/angular/modern', '');
        //   return path === pathName;
        // } else {
        return x.pathname === pathName;
        // }

      });
      if (matchingMenuItem) {
        this.activateParentDropdown(matchingMenuItem);
      }
    }
  }

  private findMenuItem(pathname: string, menuItems: any[]): any {
    for (const menuItem of menuItems) {
      if (menuItem.link && menuItem.link === pathname) {
        return menuItem;
      }

      if (menuItem.subItems) {
        const foundItem = this.findMenuItem(pathname, menuItem.subItems);
        if (foundItem) {
          return foundItem;
        }
      }
    }

    return null;
  }


  hasItems(item: MenuItem) {

    return item.subItems !== undefined ? item.subItems.length > 0 : false;

  }


  toggleMobileMenu(event: any) {
    var sidebarsize = document.documentElement.getAttribute("data-sidebar-size");
    if (sidebarsize == 'sm-hover-active') {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover')
    } else {
      document.documentElement.setAttribute("data-sidebar-size", 'sm-hover-active')
    }

  }

  SidebarHide() {
    document.body.classList.remove('vertical-sidebar-enable');
  }

}
