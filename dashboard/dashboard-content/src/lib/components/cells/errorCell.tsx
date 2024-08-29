import { CellComponent, DashboardCellWrapper } from './cellWrapper';
import * as React from 'react';

export const ErrorCell: CellComponent<{ type: string }> = ({ cell }) => {
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
        Unknown Cell
      </div>
    </DashboardCellWrapper>
  );
};
