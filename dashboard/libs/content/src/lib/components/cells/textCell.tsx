import { CellComponent, DashboardCellWrapper } from './cellWrapper';
import * as React from 'react';

export type TextCellMeta = {
  type: 'text';
  label: string;
};

export const TextCell: CellComponent<TextCellMeta> = ({ cell }) => {
  return (
    <DashboardCellWrapper
      height={cell.dimensions.width}
      width={cell.dimensions.width}
      className={'bg-lavender'}
    >
      <div
        className={
          'text-white grid place-items-center h-full capitalize text-lg'
        }
      >
        {cell.meta.label}
      </div>
    </DashboardCellWrapper>
  );
};
