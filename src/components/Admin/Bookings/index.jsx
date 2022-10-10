import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Header } from "./Header";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBookingsList } from "../../../redux/bookingsSlice";

const defaultData = [
  {
    "Booking Date": `30 August 2022`,
    "Confirmation ID": 1231435345341,
    "Session Times": `12:30`,
    HeadCount: 10,
    Amount: 84.5,
    "Booking Name": "John Doe",
    "Contact Details": `654-342-1111`,
  },
  {
    "Booking Date": `27 August 2022`,
    "Confirmation ID": 345345345,
    "Session Times": `3:00`,
    HeadCount: 122,
    Amount: 222.5,
    "Booking Name": "John Doe",
    "Contact Details": `654-333-2413`,
  },
  {
    "Booking Date": `24 August 2022`,
    "Confirmation ID": 789756758990,
    "Session Times": `11:00`,
    HeadCount: 2,
    Amount: 220.5,
    "Booking Name": "John Doe",
    "Contact Details": `654-675-6655`,
  },
];

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor("Booking Date", {
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor(`Confirmation ID`, {
    header: () => <span>Confirmation ID</span>,
    cell: (info) => (
      <a href="/" className="text-muted">
        {info.renderValue()}
      </a>
    ),
  }),
  columnHelper.accessor("Session Times", {
    header: () => "Session Times",
    cell: (info) => (
      <span className="badge bg-secondary">{info.renderValue()}</span>
    ),
  }),
  columnHelper.accessor("HeadCount", {
    header: () => <span>HeadCount</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Amount", {
    header: "Amount",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Booking Name", {
    header: "Booking Name",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("Contact Details", {
    header: "Contact Details",
    cell: (info) => info.renderValue(),
  }),
];

const BookingsList = () => {
  const appDispatch = useDispatch();
  const { bookings, loading: bookingsLoadingStatus } = useSelector(
    (appState) => appState.bookings
  );
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!!bookings && bookingsLoadingStatus === "idle") {
      appDispatch(getBookingsList());
    }
  }, [bookings, bookingsLoadingStatus, appDispatch]);

  return (
    <div className="container">
      {bookings && JSON.stringify(bookings)}
      <div className="row">
        <Header />
      </div>
      <table className="table w-100 mt-5">
        <thead className="bg-light">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BookingsList;
