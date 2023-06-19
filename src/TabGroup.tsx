import { useContext, useEffect, useState } from "react";
import { Tab } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { menuContext } from "./App";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function TabGroup() {
  let [categories] = useState([
    { name: "Artist", path: "/Artist" },
    { name: "Tracks", path: "/Tracks" },
    { name: "Genre", path: "/Genre" },
  ]);
  const navigate = useNavigate();

  const { selectedIndex, setSelectedIndex } = useContext(menuContext);
  const [location, setLocation] = useState<string>("Artist");

  return (
    <div
      id="NavBar"
      className=" w-full max-w-md fixed inset-x-0 bottom-0  bg-white rounded-md lg:bottom-3 lg:pl-5"
    >
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List className="flex space-x-1 rounded-md bg-blue-700/20 p-1">
          {Object.values(categories).map((category) => (
            <Tab
              key={category.name}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-90 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
              onClick={() => {
                if (location != category.name) {
                  document.body.style.backgroundImage = "none";
                  setLocation(category.name);
                  navigate(category.path);
                }
              }}
            >
              {category.name}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
