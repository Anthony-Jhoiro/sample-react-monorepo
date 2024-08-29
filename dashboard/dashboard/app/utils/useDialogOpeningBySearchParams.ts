import { useSearchParams } from '@remix-run/react';

export function useDialogOpeningBySearchParams(dialogName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const isDialogOpened = searchParams.has(dialogName, 'open');

  const setDialogOpening = (opening: boolean) => {
    setSearchParams((searchParams) => {
      if (opening) {
        searchParams.set(dialogName, 'open');
      } else {
        searchParams.delete(dialogName);
      }
      return searchParams;
    });
  };

  const openDialog = () => setDialogOpening(true);
  const closeDialog = () => setDialogOpening(false);
  return { isDialogOpened, setDialogOpening, openDialog, closeDialog };
}
