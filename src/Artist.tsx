import { useContext, useEffect, useState } from "react";
import Sketch from "react-p5";
import { spotifyAccessToken } from "./API/SpotifyAuthenticationAPI";
import { topArtist } from "./API/UserDataAPI";
import { Dropdown } from "./Dropdown";
import { Item, SpotifySearchParam } from "./Model/Models";
import { SinDraw, SinSetup } from "./SineWave";
import SoundCube from "../src/assets/SoundCube.svg";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { menuContext } from "./App";
import { ArtistTable, SpotifyTimeRange } from "./Model/Models";

export default function Artist() {
  const [data, setData] = useState<ArtistTable[]>([]);
  const { setNavBarVis, setSelectedIndex } = useContext(menuContext);
  const [timeframe, setTimeframe] = useState<{}>({ long: "long_term" });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const [code, setCode] = useState(urlParams.get("code"));

  function setBackground() {
    if (window.innerWidth < 500) {
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundPosition = "center bottom";
      document.body.style.backgroundImage = `url(${SoundCube})`;
    }
  }

  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }));

  async function storeToken() {
    if (code != null) {
      await spotifyAccessToken(code);
      setCode(null);
    }
  }

  useEffect(() => {
    async function LoadData() {
      let artistList: ArtistTable[] = [];

      if (localStorage.getItem("SPOTIFY_ACCESS_TOKEN")) {
        let response = await topArtist({
          TimeRange: Object.values(timeframe)[0],
          Limit: 50,
          Offset: 0,
        } as SpotifySearchParam);

        response?.data.items.forEach((element: Item) => {
          artistList.push({
            image: element.images[0].url,
            name: element.name,
            genres: element.genres,
          });
        });

        setData(artistList);
      }

      setBackground();
    }

    setNavBarVis(true);
    setSelectedIndex(0);
    storeToken();
    LoadData();
  }, [code, timeframe]);

  const columnHelper = createColumnHelper<ArtistTable>();

  const columns = [
    columnHelper.accessor("image", {
      id: "image",
      cell: (info) => (
        <img
          className="rounded-full object-cover w-20 h-20 2xl:h-40 2xl:w-40"
          src={info.getValue()}
        />
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
    columnHelper.accessor("genres", {
      id: "genres",
      cell: (info) => (
        <div className="rounded-full opacity-100 bg-white font-bold text-sm lg:font-normal xl:text-md">
          {info.getValue() &&
            info
              .getValue()
              .slice(0, window.innerWidth < 1024 ? 1 : 4)
              .join(", ")}
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
  });

  return (
    <>
      <div className="fixed top-0 left-0 invisible lg:visible">
        <Sketch setup={SinSetup} draw={SinDraw} />
      </div>
      <table className="fade-in table-auto relative mx-auto transition ease-in-out delay-150 mb-10">
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
          {[10, 20, 30, 40, 50].map((pageSize) => (
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
