import { FC, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@home-dashboard/react-components';
import {
  NewCellForm,
  Cell,
  getCellByType,
  EmptyCell,
  CellType,
} from '@home-dashboard/dashboard-content';
import { PlusIcon } from 'lucide-react';
import { useDialogOpeningBySearchParams } from '../utils/useDialogOpeningBySearchParams';

export type Props = Record<string, never>;

const newCellModalOpenedSearchParam = 'newCellModalOpened';

const horizontalCellsCount = 8;

export const DashboardPage: FC<Props> = () => {
  const [cells, setCells] = useState<Cell<CellType>[]>([]);
  const { isDialogOpened, setDialogOpening, openDialog } =
    useDialogOpeningBySearchParams(newCellModalOpenedSearchParam);

  const rowCount = 7;

  const totalCellCount = horizontalCellsCount * rowCount;

  const addCell = (cell: Cell<CellType>) => {
    setDialogOpening(false);
    setCells([...cells, cell]);
  };

  const displayedCells: (Cell<CellType> | null)[] = [
    ...cells,
    ...new Array(
      totalCellCount -
        cells
          .map((el) => el.dimensions.height * el.dimensions.width)
          .reduce((a, b) => a + b, 0)
    ).fill(null),
  ];

  return (
    <>
      <div className={'flex flex-col justify-center p-3 min-h-screen'}>
        <div
          className={
            'grid grid-cols-8 grid-rows-8 grid-flow-dense gap-3 w-full my-auto'
          }
        >
          {displayedCells.map((cell, i) => {
            return cell ? (
              getCellByType(cell.meta.type)({
                cell: cell as any,
              })
            ) : (
              <EmptyCell key={i} />
            );
          })}
        </div>
      </div>
      <Button
        className={'fixed bottom-5 right-5'}
        size={'icon'}
        onClick={openDialog}
      >
        <PlusIcon />
      </Button>

      <Dialog open={isDialogOpened} onOpenChange={setDialogOpening}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new cell</DialogTitle>
          </DialogHeader>
          <NewCellForm
            t={{
              title: 'Create new cell',
              submitButton: 'Create',
              fields: {
                name: {
                  label: 'Name',
                  placeholder: 'Enter cell name',
                },
                label: {
                  label: 'Label',
                  placeholder: 'Enter cell label',
                },
                type: {
                  label: 'Type',
                },
                href: {
                  label: 'Url',
                  placeholder: 'https://anthonyquere.fr',
                },
                dimensionsHeight: {
                  label: 'Height',
                  placeholder: '1',
                },
                dimensionsWidth: {
                  label: 'Width',
                  placeholder: '1',
                },
              },
            }}
            onSubmit={addCell}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
