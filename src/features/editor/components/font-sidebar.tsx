"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ActiveTool, Editor, fonts } from "../types";
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

const FontSidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const value = editor?.getActiveFontFamily();
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
        activeTool === "font" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />

      <ScrollArea>
        <div className="p-4 space-y-2 border-b">
          {fonts.map((item) => {
            return (
              <Button
                key={item}
                variant={"secondary"}
                size={"lg"}
                className={cn(
                  "w-full h-16 justify-start text-left",
                  value === item && "border-2 border-blue-500"
                )}
                style={{
                  fontFamily: item,
                  fontSize: "16px",
                  padding: "8px 16px",
                }}
                onClick={() => {
                  editor?.changeFontFamily(item);
                }}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default FontSidebar;
