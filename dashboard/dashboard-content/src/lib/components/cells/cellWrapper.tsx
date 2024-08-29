import * as React from 'react';
import { clsx } from 'clsx';
import { FC } from 'react';
import { Cell } from '../../models/cell';

export const mapWidthClass: { [key: number]: string } = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
};

export const mapHeightClass: { [key: number]: string } = {
  1: 'row-span-1',
  2: 'row-span-2',
  3: 'row-span-3',
  4: 'row-span-4',
  5: 'row-span-5',
  6: 'row-span-6',
  7: 'row-span-7',
  8: 'row-span-8',
};

type Props = React.PropsWithChildren<{
  height: number;
  width: number;
  className: HTMLDivElement['className'];
}>;

export const DashboardCellWrapper: React.FC<Props> = ({
  children,
  height,
  width,
  className,
}) => (
  <div
    className={clsx(
      'border rounded',
      mapWidthClass[width],
      mapHeightClass[height],
      className
    )}
  >
    {children}
  </div>
);

export const EmptyCell: React.FC = () => {
  return <div className={'border rounded aspect-[5/4]'} />;
};

export type CellComponent<T extends string> = FC<{ cell: Cell<T> }>;
