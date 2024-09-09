"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActiveTool,
  Editor,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
} from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined; //CHANGE TYPE
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const OpacitySidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const [opacity, setOpacity] = useState(editor?.getActiveOpacity() || 1);
  const selectedObject = useMemo(
    () => editor?.selectedObjects[0],
    [editor?.selectedObjects]
  );

  const onClose = () => {
    onChangeActiveTool("select");
  };

  useEffect(() => {
    if (selectedObject) {
      setOpacity(selectedObject.get("opacity") || 1);
    }
  }, [selectedObject]);

  const onChange = (value: number) => {
    editor?.changeOpacity(value);
    setOpacity(value);
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "opacity" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Opacity"
        description="Change the opacity of the selected object"
      />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm ">Opacity</Label>
          <Slider
            value={[opacity]}
            onValueChange={(value) => onChange(value[0])}
            max={1}
            min={0}
            step={0.01}
          />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default OpacitySidebar;
