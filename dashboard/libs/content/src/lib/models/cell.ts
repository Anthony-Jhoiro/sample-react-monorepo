export type CellMeta<T extends string> = { type: T };

export type Cell<
  T extends string = string,
  M extends CellMeta<T> = { type: T }
> = {
  name: string;
  meta: M;
  dimensions: {
    width: number;
    height: number;
  };
};
