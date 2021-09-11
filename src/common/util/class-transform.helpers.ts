import { merge } from 'lodash';

export const unflattenObject = <T>(obj: object, separator: string = '_'): T => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const nestedProperties = key.split(separator);
    const actualValueProperty = nestedProperties.pop();

    return merge(
      acc,
      nestedProperties.reverse().reduce((a, c) => ({ [c]: a }), { [actualValueProperty]: value }),
    );
  }, {}) as T;
};
