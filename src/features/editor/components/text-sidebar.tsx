"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ActiveTool, Editor } from "../types";
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

const TextSidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

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
        activeTool === "text" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Text" description="Add text to your canvas" />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Button
            className="w-full "
            onClick={() => {
              editor?.addText("Textbox");
            }}
          >
            Add a textbox
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16 "
            onClick={() => {
              editor?.addText("Heading", {
                fontSize: 80,
                fontWeight: 700,
              });
            }}
          >
            <span className="text-3xl font-bold"> Add a heading</span>
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16 "
            onClick={() => {
              editor?.addText("Subheading", {
                fontSize: 50,
                fontWeight: 500,
              });
            }}
          >
            <span className="text-xl font-semibold"> Add a subheading</span>
          </Button>
          <Button
            variant={"secondary"}
            className="w-full h-16 "
            onClick={() => {
              editor?.addText("Paragraph", {
                fontSize: 32,
                fontWeight: 500,
              });
            }}
          >
            Paragraph
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default TextSidebar;
