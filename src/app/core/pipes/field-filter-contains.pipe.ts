import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'fieldFilterContains',
    standalone: true
  })
  
  export class FieldFilterContainsPipe implements PipeTransform {
    transform(items: any[], field : string, value : string): any[] {
      if (!items) return [];
      if (!value) return items;
      return items.filter(it => it[field].toString().toUpperCase().includes(value.toUpperCase()));
    }
  }
  