import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

const stopwords = ['the', 'of', 'a', 'in', 'or', 'for', 'and', 'but', 'to', 'is'];

@Pipe({
  name: 'titlecase'
})
export class TitlecasePipe implements PipeTransform {

  transform(input: string, args?: any): string {
    if (input.length === 0) { return '';  }
    const split = input.split(' ');
    return _.map(_.range(split.length)).map(i => {
      const token = split[i].trim();
      if (i > 0 && stopwords.indexOf(token.toLowerCase()) >= 0) {
        return token.toLowerCase();
      }
      return token[0].toUpperCase() + token.substr(1);
    }).join(' ')
    // input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }

}
