"use client";

import * as React from "react";
import SidebarItem from "./sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";
import { ActiveTool } from "../types";

type Props = {
  activeTool: ActiveTool;

  onChangeActiveTool: (tool: ActiveTool) => void;
};

const Sidebar = ({ activeTool, onChangeActiveTool }: Props) => {
  return (
    <aside className="bg-white flex flex-col w-[100px] h-full border-r overflow-y-auto">
      <ul className="flex flex-col ">
        {/* // Do not pass the icon as <Icon />. */}
        <SidebarItem
          icon={LayoutTemplate}
          label="Design"
          isActive={activeTool === "templates"}
          onClick={() => {
            onChangeActiveTool("templates");
          }}
        />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={activeTool === "images"}
          onClick={() => {
            onChangeActiveTool("images");
          }}
        />{" "}
        <SidebarItem
          icon={Type}
          label="text"
          isActive={activeTool === "text"}
          onClick={() => {
            onChangeActiveTool("text");
          }}
        />
        <SidebarItem
          icon={Shapes}
          label="Shapes"
          isActive={activeTool === "shapes"}
          onClick={() => {
            onChangeActiveTool("shapes");
          }}
        />
        <SidebarItem
          icon={Pencil}
          label="Draw"
          isActive={activeTool === "draw"}
          onClick={() => {
            onChangeActiveTool("draw");
          }}
        />
        <SidebarItem
          icon={Settings}
          label="Settings"
          isActive={activeTool === "settings"}
          onClick={() => {
            onChangeActiveTool("settings");
          }}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
