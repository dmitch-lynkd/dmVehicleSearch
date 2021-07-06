import React, {
  useState,
  useMemo,
  ChangeEvent,
  useEffect,
} from 'react';

import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGINATION_COUNT,
  DEFAULT_FILTER_DEBOUNCE_TIME,
} from '../../constants/constants';
import { useVehicleSearchContext } from '../../VehicleSearchContext';
import DataGridPager from './data-grid-pager';

export type ColumnState = {
  column: DataGridColumn;
};

export type RowState = {
  item: any;
  index: number;
};

interface TransformFunc {
  (a: any, row: RowState): any;
}

export interface DataGridColumn {
  name: string;
  text: string;
  format?: (value: any, item?: any) => string;
  template?: (row: RowState) => JSX.Element | null;
}

export interface DataGridRowFilter {
  (row: any): boolean;
}

export interface DataGridProps {
  items: any[];
  columns: DataGridColumn[];
  filters?: DataGridRowFilter[];
  pageSize?: number;
  paginationSize?: number;
  filterDebounceTime?: number;
  searchTextPlaceholder?: string;
}

export type DataGridRef = {
  selectAll: () => void;
  selectNone: () => void;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
};

const DataGrid = React.forwardRef<DataGridRef, DataGridProps>((props, ref) => {
  const {
    items,
    columns,
    filters = [],
    pageSize = DEFAULT_PAGE_SIZE,
    paginationSize = DEFAULT_PAGINATION_COUNT,
    filterDebounceTime = DEFAULT_FILTER_DEBOUNCE_TIME,
    searchTextPlaceholder = 'Enter search terms',
  } = props;

  const [pageNumber, setPageNumber] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [currentPageSize, setCurrentPageSize] = useState(
    pageSize > 0 ? pageSize : items.length,
  );

  const { setPageSize } = useVehicleSearchContext();
  useEffect(() => {
    if (setPageSize)
      setPageSize(currentPageSize);
  }, [currentPageSize]);

  // create columns
  const [columnStates, setColumnStates] = useState<ColumnState[]>(
    columns.map((c, index) => ({
      column: c,
    })),
  );

  // create rows
  const rows = useMemo(
    () =>
      (items
        ? items.map((item, index) => {
            const row: RowState = {
              item,
              index,
            };
            return row;
          })
        : []),
    [items],
  );

  // filter and sort
  const filtered = useMemo(() => {
    // collect terms
    const terms = searchTerm
      .split(' ')
      .map((t) => t.toUpperCase())
      .filter((t) => t.length > 0);

    // filter rows
    const updatedRows = rows
      .filter((row) => filters.every((filter) => filter(row.item)))
      .filter((row) =>
        terms.length === 0 || terms.some((t) =>
          columns.some(
            (c) => row.item[c.name] && row.item[c.name].toUpperCase().includes(t),
          ),
        ),
      );

    return updatedRows;
  }, [filters, rows, columnStates, searchTerm]);

  // paging
  const firstIndex = pageNumber * currentPageSize;
  const lastIndex = Math.min(firstIndex + currentPageSize, filtered.length);

  // debounce update after search input changed.
  useEffect(() => {
    if (rows.length === 0) return;

    // dispatch change to search term after delay.
    const handle = setTimeout(
      () => setSearchTerm(searchInput),
      filterDebounceTime,
    );

    return () => {
      clearTimeout(handle);
    };
  }, [searchInput]);

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const formatCell = (row: RowState, column: DataGridColumn) => {
    if (column.template) {
      return column.template(row);
    } else {
      return column.format
        ? column.format(row.item[column.name], row.item)
        : row.item[column.name];
    }
  };

  const renderCell = (row: RowState, column: DataGridColumn) =>
    (<td key={column.name}>{formatCell(row, column)}</td>);

  return !items ? null : (
    <>
      <div className="row">
        <div className="col">
            <div className="search-bar">
              <div className="input-group">
                <span className="input-group-addon">
                  <i className="fas fa-search" />
                </span>
                <div style={{ marginBottom: '5px', marginLeft: '5px' }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={searchTextPlaceholder}
                    value={searchInput}
                    onChange={onSearchInputChanged}
                  />
                </div>
              </div>
            </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-hover table-sm table-striped">
            <thead className="bg-secondary">
              <tr>
                {columnStates.map((c, index) =>
                  (
                    <th key={c.column.name}>
                      {c.column.text}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {filtered
                .filter((_, index) => index >= firstIndex && index < lastIndex)
                .map((row) => (
                  <tr key={row.item.id}>
                    {columnStates.map((c) => renderCell(row, c.column))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {filtered.length === 0 ? null : (
            <p>{`Showing ${firstIndex + 1}-${lastIndex} of ${
              filtered.length
            } records.`}</p>
          )}
        </div>
        <div className="col-auto">
          <div className="row">
            <div className="col-sm-auto">
              <label htmlFor="pagesize" className="col-form-label">
                Rows per Page:
              </label>
            </div>
            <div className="col-sm-auto pl-0 pr-0">
              <select
                id="pagesize"
                className="form-control"
                value={currentPageSize}
                onChange={(e) => {
                  const newPageSize = parseFloat(e.target.value);
                  const pageCount = Math.ceil(filtered.length / newPageSize);
                  const lastPage = pageCount - 1;

                  if (pageNumber > lastPage) {
                    setPageNumber(lastPage);
                  }

                  setCurrentPageSize(newPageSize);
                }}
              >
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={items.length}>All</option>
              </select>
            </div>
          </div>
        </div>
        <div className="col-auto">
          <DataGridPager
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemCount={filtered.length}
            pageSize={currentPageSize}
            paginationCount={paginationSize}
          />
        </div>
      </div>
    </>
  );
});

export default DataGrid;