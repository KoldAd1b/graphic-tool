import React from "react";
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

const StrokeWidthSidebar = ({
  activeTool,
  onChangeActiveTool,
  editor,
}: Props) => {
  const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
  const typeValue = editor?.getActiveStrokeDashed() || STROKE_DASH_ARRAY;
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (value: number) => {
    editor?.changeStrokeWidth(value);
  };
  const onChangeStrokeType = (values: number[]) => {
    editor?.changeStrokeDashArray(values);
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "stroke-width" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Stroke Options"
        description="Modify the stroke of your object or element"
      />

      <ScrollArea>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm ">Stroke Width</Label>
          <Slider
            value={[widthValue]}
            onValueChange={(values) => onChange(values[0])}
          />
        </div>
        <div className="p-4 space-y-4 border-b">
          <Label className="text-sm ">Stroke Type</Label>
          <Button
            variant={"secondary"}
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              JSON.stringify(typeValue) === "[5,5]" && "border border-blue-500"
            )}
            style={{
              padding: "8px 16px",
            }}
            onClick={() => onChangeStrokeType([5, 5])}
          >
            <div className="w-full border-black rounded-full border-4 border-dashed " />
          </Button>

          <Button
            variant={"secondary"}
            size="lg"
            className={cn(
              "w-full h-16 justify-start text-left",
              JSON.stringify(typeValue) === "[]" && "border border-blue-500"
            )}
            style={{
              padding: "8px 16px",
            }}
            onClick={() => onChangeStrokeType([])}
          >
            <div className="w-full border-black rounded-full border-4  " />
          </Button>
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default StrokeWidthSidebar;
