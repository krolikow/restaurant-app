import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false,
})
export class FilterPipe implements PipeTransform {

    transform(value: Array<any>, filterKeys: { [key: string]: any }): any {
        if (!value) return [];
        if (value.length === 0 || Object.keys(filterKeys).length === 0) {
            return value;
        }

        return value.filter(item => {
            return Object.keys(filterKeys).every(key => {
                if (key == 'minPrice') {
                    return +item['price'] >= +filterKeys[key] || filterKeys[key] === "";
                }
                if (key == 'maxPrice') {
                    return +item['price'] <= +filterKeys[key] || filterKeys[key] === "";
                }
                for (let selectedItem of filterKeys[key]) {
                    let itemKey = item[key]
                    if (key == 'rate') {
                        itemKey = Math.trunc(Number(itemKey));
                    }
                    if (new RegExp('^' + selectedItem[key], 'gi').test(itemKey)) {
                        return true;
                    }
                }
                return filterKeys[key] === "" || filterKeys[key].length == 0
            })
        })
    }
}
