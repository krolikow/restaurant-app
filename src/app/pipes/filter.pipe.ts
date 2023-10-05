import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false,
})
export class FilterPipe implements PipeTransform {

    transform(value: Array<any>, filterKeys: { [key: string]: any }): any {
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
                if (key == 'rate') {
                    const dishRate = Math.trunc(item[key]);
                    return new RegExp(filterKeys[key], 'gi').test(String(dishRate)) || filterKeys[key] === ""
                }
                return new RegExp('^' + filterKeys[key], 'gi').test(item[key]) || filterKeys[key] === ""
            })
        })
    }
}
