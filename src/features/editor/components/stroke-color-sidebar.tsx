import React from "react";
import { ActiveTool, Editor, STROKE_COLOR } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined; //CHANGE TYPE
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const StrokeColorSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: Props) => {
  const value = editor?.getActiveStrokeColor() || STROKE_COLOR;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (color: string) => {
    editor?.changeStrokeColor(color);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Color"
        description="Add stroke color to your element"
      />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <ColorPicker value={value} onChange={onChange} />
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeColorSidebar;
