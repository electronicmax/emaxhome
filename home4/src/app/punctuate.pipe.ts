import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'punctuate'
})
export class PunctuatePipe implements PipeTransform {

  transform(value: any, args?: any): string {
    const val = value.trim(),
      s = val.slice(-1)[0],
      result = '.!?:/'.indexOf(s) >= 0;

    if (result) {
      console.log('ah ha ', val);
      return val;
    } else {
      return val + '.';
    }
  }

}
