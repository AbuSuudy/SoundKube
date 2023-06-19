import { Dropdown } from "./Dropdown";
import Sketch from "react-p5";
import { SinDraw, SinSetup } from "./SineWave";
import { SpotifySearchParam } from "./Model/Models";
import { TrackItem } from "./Model/Tracks";
import { topTracks } from "./API/UserDataAPI";
import { useContext, useEffect, useState } from "react";
import { SpotifyTimeRange, TracksTable } from "./Model/Models";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { menuContext } from "./App";
import SoundCube from "../src/assets/SoundCube.svg";

export default function Tracks() {
  const [data, setData] = useState<TracksTable[]>([]);
  const { setSelectedIndex } = useContext(menuContext);
  const [timeframe, setTimeframe] = useState<{}>({ short: "short_term" });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const columnHelper = createColumnHelper<TracksTable>();

  function setBackground() {
    if (window.innerWidth < 500) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPositionX = "23%";
      document.body.style.backgroundImage = `url(${SoundCube})`;
    }
  }

  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }));

  useEffect(() => {
    setSelectedIndex(1);
  }, []);

  useEffect(() => {
    async function LoadData() {
      let trackList: TracksTable[] = [];

      let response = await topTracks({
        TimeRange: Object.values(timeframe)[0],
        Limit: 50,
        Offset: 0,
      } as SpotifySearchParam);

      response?.forEach((element: TrackItem) => {
        trackList.push({
          image: element.album.images[0].url,
          name: element.artists[0].name,
          track: element.name,
        });
      });

      setData(trackList);

      setBackground();
    }

    LoadData();
  }, [timeframe]);

  const columns = [
    columnHelper.accessor("image", {
      id: "image",
      cell: (info) => (
        <img className="w-20 h-20 2xl:h-40 2xl:w-40" src={info.getValue()} />
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className="rounded-full opacity-100 bg-white font-bold text-sm lg:font-medium xl:text-2xl">
          {info.getValue()}
        </div>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("track", {
      id: "track",
      cell: (info) => (
        <div className="rounded-full opacity-100 bg-white font-bold text-xs lg:font-normal xl:text-md">
          {info.getValue()}
        </div>
      ),
      header: () => <span></span>,
    }),
  ];

  let table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: window.innerWidth < 1024 ? true : false,
    getCoreRowModel: getCoreRowModel(),
    initialState: { pagination: { pageSize: 25 } },
  });

  return (
    <>
      <div className="fixed top-0 left-0 invisible lg:visible">
        <Sketch setup={SinSetup} draw={SinDraw} />
      </div>
      <table className="fade-in-table table-auto relative mx-auto transition ease-in-out delay-150 mb-10">
        <thead>
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
            <tr key={row.id} className="divide-y">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={
                    cell.column.columnDef.id != "image"
                      ? " w-1/3 lg:w-96 lg:bg-white"
                      : "lg:w-40"
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invisible  flex right-10 gap-2 fixed  ml-5 border border-sky-500 rounded-lg p-3 bg-white lg:bottom-3 lg:visible">
        <button
          className="border rounded p-1 bg-white"
          onClick={() => {
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1 bg-white"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1 bg-white"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1 bg-white"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          className="bg-white"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <Dropdown
        setTimeframe={setTimeframe}
        selectedlabel={Object.keys(timeframe)[0]}
        items={
          [
            { label: "Short", value: "short_term" },
            { label: "Medium", value: "medium_term" },
            { label: "long", value: "long_term" },
          ] as SpotifyTimeRange[]
        }
      />
    </>
  );
}
