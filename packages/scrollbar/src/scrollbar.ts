import {moveEvent} from '@nimble-ui/move';
import {ElementType} from '@nimble-ui/common/types';

export function scrollbar(el: ElementType, options: ScrollOptions) {
  moveEvent(el);
  console.log(options);
}
