"use client";
import React from "react";
// NextJS
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// Components
import TimeSelector from "./timeSelector";

// Icons
import {
  WatchLater as WatchLaterIcon,
  ListAlt as ListAltIcon,
  Equalizer as EqualizerIcon,
} from "@mui/icons-material";

// Components
const Sidebar = () => {
  const pathname = usePathname();

  const icons = {
    WatchLaterIcon: <WatchLaterIcon />,
    ListAltIcon: <ListAltIcon />,
    EquilizerIcon: <EqualizerIcon />,
  };

  const NavItem = (props) => {
    const isActive = () => {
      return pathname.split("/")[2] == props.name.toLowerCase();
    };

    const Icon = icons[props.icon];

    return (
      <Link
        href={`/dashboard/${props.name.toLowerCase()}`}
        className={`flex flex-row gap-4 items-center rounded-md ${
          isActive() ? "bg-primary" : ""
        }  p-2`}
      >
        {Icon &&
          React.cloneElement(Icon, {
            style: { color: isActive() ? "white" : "grey" },
          })}
        <p className={`text-sm ${isActive() ? "text-white" : "text-grey"}`}>
          {props.name}
        </p>
      </Link>
    );
  };

  return (
    <div className="flex flex-col w-60 p-4 border-r min-h-screen border-line top-0 sticky bg-surface">
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 items-center p-2 ">
          <Image src="/logo.png" width={35} height={35} alt="Timesage logo" />
          <p>Timesage</p>
        </div>
        <ul className="flex flex-col gap-4 py-8">
          <li>
            <NavItem name="Entries" icon="WatchLaterIcon" />
          </li>
          <li>
            <NavItem name="Projects" icon="ListAltIcon" />
          </li>
          <li>
            <NavItem name="Summary" icon="EquilizerIcon" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
