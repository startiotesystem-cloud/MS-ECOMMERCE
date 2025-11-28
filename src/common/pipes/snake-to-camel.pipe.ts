// src/common/pipes/snake-to-camel.pipe.ts
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { toCamelCase } from '../helpers/case.util';


@Injectable()
export class SnakeToCamelPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      return toCamelCase(value);

    }
    return value;
  }
}
