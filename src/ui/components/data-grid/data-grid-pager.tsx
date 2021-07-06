import React, { useState, useEffect } from 'react';
import { times } from 'lodash';

type DataGridPagerProps = {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  itemCount: number;
  pageSize: number;
  paginationCount: number;
};

const DataGridPager: React.FC<DataGridPagerProps> = ({
  pageNumber,
  setPageNumber,
  itemCount,
  pageSize,
  paginationCount,
}) => {
  const [windowStart, setWindowStart] = useState(1);

  const pageCount = Math.ceil(itemCount / pageSize);
  const lastPage = pageCount - 1;
  const innerPaginationCount = Math.min(pageCount, paginationCount);
  const windowSize = innerPaginationCount - 2;

  const checkWindow = (page: number) => {
    let currentWindowStart = windowStart;

    // check if window off to right side
    if (currentWindowStart > lastPage - windowSize) {
      currentWindowStart = lastPage - windowSize;
    }

    // check if page off left side
    if (page - 1 < currentWindowStart) {
      currentWindowStart = Math.max(1, page - 1);
    }

    // check if page is off right side
    if (page + 2 > currentWindowStart + windowSize - 1) {
      currentWindowStart = Math.min(
        lastPage - windowSize,
        page + 2 - windowSize,
      );
    }

    if (currentWindowStart !== windowStart) {
      setWindowStart(currentWindowStart);
    }
  };

  const changePage = (page: number) => {
    if (page < 0 || page > lastPage) return;

    if (page !== pageNumber) {
      setPageNumber(page);
    }

    checkWindow(page);
  };

  useEffect(() => {
    if (pageNumber < 0) {
      setPageNumber(0);
    } else if (lastPage >= 0 && pageNumber > lastPage) {
      setPageNumber(lastPage);
    }

    checkWindow(pageNumber);
  }, [itemCount, pageSize]);

  return pageCount < 2 ? (
    <></>
  ) : (
    <nav>
      <ul className="pagination justify-content-end">
        <li className={`page-item ${pageNumber === 0 ? 'disabled' : ''}`}>
          <a
            className="page-link"
            role="button"
            onClick={() => changePage(pageNumber - 1)}
          >
            <i className="fa fa-angle-left" />
          </a>
        </li>
        <li className={`page-item ${pageNumber === 0 ? 'active' : ''}`}>
          <a className="page-link" role="button" onClick={() => changePage(0)}>
            {1}
          </a>
        </li>
        {times(windowSize, (i) => {
          const n = windowStart + i;
          const isEllipsis =
            (i === 0 && n !== 1) ||
            (i === windowSize - 1 && n !== lastPage - 1);
          const isActive = !isEllipsis && n === pageNumber;
          return (
            <li
              key={n}
              className={`page-item ${isEllipsis ? 'disabled' : ''} ${
                isActive ? 'active' : ''
              }`}
            >
              <a
                className="page-link"
                role="button"
                onClick={() => changePage(n)}
              >
                {isEllipsis ? '...' : n + 1}
              </a>
            </li>
          );
        })}
        <li className={`page-item ${pageNumber === lastPage ? 'active' : ''}`}>
          <a
            className="page-link"
            role="button"
            onClick={() => changePage(lastPage)}
          >
            {pageCount}
          </a>
        </li>
        <li
          className={`page-item ${pageNumber === lastPage ? 'disabled' : ''}`}
        >
          <a
            className="page-link"
            role="button"
            onClick={() => changePage(pageNumber + 1)}
          >
            <i className="fa fa-angle-right" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default DataGridPager;