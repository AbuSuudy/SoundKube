import { Menu, Transition, Tab } from "@headlessui/react";
import { SpotifyTimeRange } from "./Model/Models";

export function Dropdown(props: MenuProps) {
  return (
    <div className="fixed right-0 text-center mr-5 top-2 lg:top-5">
      <Menu>
        <Menu.Button className="border border-sky-500 bg-white focus:outline-none w-15 text-sm">
          <div className="flex flex-row content-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <div className="ml-2">{props.selectedlabel}</div>
          </div>
        </Menu.Button>

        <Transition
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-90 translate-x-4000"
          enterTo="transform opacity-100 scale-100 translate-x-0"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items>
            {props.items.map((element, index) => {
              return (
                <div key={element.label}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active
                            ? " bg-green-500 text-white w-15"
                            : "text-gray-900 bg-white"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sms`}
                        onClick={() => {
                          props.setTimeframe({
                            [element.label]: element.value,
                          });
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        {element.label}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              );
            })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export interface MenuProps {
  selectedlabel: string;
  items: SpotifyTimeRange[];
  setTimeframe: React.Dispatch<React.SetStateAction<{}>>;
}
