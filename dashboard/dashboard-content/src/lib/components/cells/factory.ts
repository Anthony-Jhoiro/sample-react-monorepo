import { TextCell } from './textCell';
import { LinkCell } from './linkCell';
import { ErrorCell } from './errorCell';

const cellMap = {
  text: TextCell,
  link: LinkCell,
} as const;

export type CellType = keyof typeof cellMap;
export const cellTypes = Object.keys(cellMap) as CellType[];

export function getCellByType<T extends CellType = CellType>(
  type: T
): (typeof cellMap)[T] | typeof ErrorCell {
  return cellMap[type] ?? ErrorCell;
}
