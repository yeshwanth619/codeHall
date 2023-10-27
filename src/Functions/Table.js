import React from 'react';
import { useTable, useSortBy } from 'react-table';
import './Graph.css';

// Memoize the Table component to prevent unnecessary renders
const Table = React.memo(function Table(props) {
  // Memoize the data to avoid recalculating when props.cryptoData changes
  const dataForTable = React.useMemo(() => props.cryptoData, [props.cryptoData]);

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date', // Column header label
        accessor: 'time', // Data accessor for this column
      },
      {
        Header: 'Price', // Column header label
        accessor: 'price', // Data accessor for this column
      },
    ],
    []
  );

  // Use react-table to define table properties and features
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: dataForTable,
    },
    useSortBy
  );

  return (
    <div className="table-container">
      {/* Render the table */}
      <table {...getTableProps()} className="table">
        <thead>
          {/* Render table header */}
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {/* Render column header */}
                  {column.render('Header')}
                  <span>
                    {/* Show sorting indicator */}
                    { (column.isSortedDesc ? ' 🔽' : ' 🔼') }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {/* Render table rows */}
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

export default Table;
