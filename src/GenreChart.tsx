import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsBoost from "highcharts/modules/boost";
import HC_more from "highcharts/highcharts-more";
import { topGenres } from "./API/UserDataAPI";
import { useEffect, useState, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
  ChartData,
  GenreReturn,
  GenreTable,
  SpotifySearchParam,
} from "./Model/Models";
HC_more(Highcharts);
HighchartsBoost(Highcharts);

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { menuContext } from "./App";
import SoundCube from "../src/assets/SoundCube.svg";
export default function GenreChart() {
  const [data, setData] = useState<GenreTable[]>([]);
  const { setSelectedIndex } = useContext(menuContext);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center bottom";
  document.body.style.backgroundImage = `url(${SoundCube})`;

  const columnHelper = createColumnHelper<GenreTable>();

  const columns = [
    columnHelper.accessor("name", {
      id: "name",
      cell: (info) => (
        <div className=" bg-white font-bold text-sm lg:font-medium xl:text-lg pr-3 my-1">
          {info.getValue()}
        </div>
      ),
      header: () => <span></span>,
    }),
    columnHelper.accessor("value", {
      id: "value",
      cell: (info) => (
        <div className="bg-white font-bold text-sm lg:font-medium xl:text-lg">
          {info.getValue()}
        </div>
      ),
      header: () => <span></span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    async function LoadGenreData() {
      let response = await topGenres({
        TimeRange: "long_term",
        Limit: 50,
        Offset: 0,
      } as SpotifySearchParam);

      setChartData(response.chart);
      setData(response.table);
    }

    LoadGenreData();
    table.setPageSize(15);
    setSelectedIndex(2);
  }, []);

  const options = {
    chart: {
      type: "packedbubble",
      backgroundColor: null,
    },
    accessibility: {
      enabled: false,
    },
    title: {
      text: "",
    },
    legend: { enabled: false },
    tooltip: {
      useHTML: true,
      pointFormat: "<b>{point.name}:</b> {point.value}",
      headerFormat: "",
    },
    credits: {
      enabled: false,
    },
    boost: { seriesThreshold: 1 },
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: true,
          },
          inactive: {
            enabled: true,
            opacity: 0.65,
          },
          select: {
            enabled: true,
          },
        },
      },
      minFontSize: 10,
      packedbubble: {
        opacity: 1,
        minSize: 1,
        maxSize: 5,
        useSimulation: false,
        marker: {
          fillOpacity: 0.94,
        },
        layoutAlgorithm: {
          splitSeries: false,
        },
        dataLabels: {
          allowOverlap: false,
          enabled: true,
          defer: false,
          format: "{point.name}",
          series: {
            opacity: 1,
          },
          style: {
            color: "black",
            fontSize: 13,
            textOverflow: "clip",
          },
        },
      },
    },
    series: window.innerWidth < 500 ? chartData.slice(0, 30) : chartData,
  };

  return (
    <>
      <button
        className="bg-white text-black border-sky-500 py-2 px-4 rounded fixed right-0 text-center mr-5 top-2 lg:top-5 z-20"
        onClick={openModal}
      >
        Table
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <table className="table-auto relative mx-auto transition ease-in-out delay-150 mb-14 h-52">
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
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className={
                                cell.column.columnDef.id != "image"
                                  ? " w-1/3 lg:w-96 lg:bg-white"
                                  : "lg:w-40"
                              }
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 flex items-end">
                    <div className="flex items-center gap-2 rounded-lg  bg-white absolute bottom-0 right-0  mr-6 pb-5">
                      <button
                        className="border rounded  bg-white"
                        onClick={() => {
                          table.previousPage();
                        }}
                        disabled={!table.getCanPreviousPage()}
                      >
                        {"<"}
                      </button>
                      <button
                        className="border rounded  bg-white"
                        onClick={() => {
                          table.nextPage();
                        }}
                        disabled={!table.getCanNextPage()}
                      >
                        {">"}
                      </button>
                      <span className="flex items-center">
                        <div className="mr-1">Page</div>
                        <strong>
                          {table.getState().pagination.pageIndex + 1} of{" "}
                          {table.getPageCount()}
                        </strong>
                      </span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <div style={{ height: "100%", width: "100%" }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{
            style: { height: "92vh" },
          }}
        />
      </div>
    </>
  );
}
