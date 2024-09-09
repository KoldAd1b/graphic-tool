"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ActiveTool, Editor, filters, fonts } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined; //CHANGE TYPE
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const FilterSidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const value = editor?.getActiveFilters || [];
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "filter" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Filters"
        description="Change the image filter"
      />

      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {filters.map((filter) => {
            return (
              <Button
                key={filter}
                variant={"secondary"}
                size={"lg"}
                className={cn("w-full h-16 justify-start text-left")}
                style={{
                  fontSize: "16px",
                  padding: "8px 16px",
                }}
                onClick={() => {
                  editor?.changeImageFilter(filter);
                }}
              >
                {filter}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FilterSidebar;
