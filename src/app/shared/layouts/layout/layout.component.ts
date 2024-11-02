import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {



  ngOnInit(): void {

    document.documentElement.setAttribute('data-layout', "vertical");
    document.documentElement.setAttribute('data-bs-theme', "light");
    document.documentElement.setAttribute('data-layout-width', "fluid");
    document.documentElement.setAttribute('data-layout-position', "fixed");
    document.documentElement.setAttribute('data-topbar', "light");

    document.documentElement.setAttribute('data-sidebar', "dark");
    document.documentElement.setAttribute('data-sidebar-size', "lg");
    document.documentElement.setAttribute('data-sidebar-image', "img-4");
    document.documentElement.setAttribute('data-layout-style', "default");

    document.documentElement.setAttribute('data-preloader', "disable");
    document.documentElement.setAttribute('data-sidebar-visibility', "show");

  }



}
