/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";
import React from "react";
import { useRowSelect, useTable } from "react-table";

export interface table {
  columns: any;
  data: any;
}

export const CommonTable = ({ columns, data }: table) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useRowSelect,
    );
  const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

  const toggleRow = (rowId: number) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  return (
    <Box overflowX="auto" style={{ WebkitOverflowScrolling: "touch" }}>
      <Table {...getTableProps()} width="full">
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                key={index}
                onClick={() => toggleRow(index)}
                backgroundColor={selectedRows.includes(index) ? "pink.400" : ""}
                textColor={selectedRows.includes(index) ? "white" : ""}
                cursor="pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
