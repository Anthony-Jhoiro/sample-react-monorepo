import { CellComponent, DashboardCellWrapper } from './cellWrapper';
import * as React from 'react';
import { Link } from '@remix-run/react';

export type LinkCellMeta = {
  type: 'link';
  label: string;
  href: string;
};

export const LinkCell: CellComponent<LinkCellMeta> = ({ cell }) => {
  return (
    <DashboardCellWrapper
      height={cell.dimensions.width}
      width={cell.dimensions.width}
      className={'bg-rosewater'}
    >
      <div
        className={
          'text-text underline grid place-items-center h-full capitalize text-lg'
        }
      >
        <Link to={cell.meta.href}>{cell.meta.label}</Link>
      </div>
    </DashboardCellWrapper>
  );
};
