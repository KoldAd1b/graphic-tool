import React, { useEffect, useMemo, useState } from "react";
import { ActiveTool, Editor, FILL_COLOR } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import ColorPicker from "./color-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined; //CHANGE TYPE
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const SettingsSidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const value = editor?.getActiveFillColor() || FILL_COLOR;
  const workspace = editor?.getWorkspace();

  const initialWidth = useMemo(() => {
    return `${workspace?.width ?? 0}`;
  }, [workspace]);
  const initialHeight = useMemo(() => {
    return `${workspace?.height ?? 0}`;
  }, [workspace]);
  const initialBackground = useMemo(() => {
    return workspace?.fill ?? "#FFFFFF";
  }, [workspace]);

  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);

  const [background, setBackground] = useState(initialBackground);

  useEffect(() => {
    setWidth(initialWidth);
    setHeight(initialHeight);
    setBackground(initialBackground);
  }, [initialWidth, initialBackground, initialHeight]);

  const onClose = () => {
    onChangeActiveTool("select");
  };

  const onChange = (color: string) => {
    editor?.changeFillColor(color);
  };

  const changeWidth = (value: string) => {
    setWidth(value);
  };
  const changeHeight = (value: string) => {
    setHeight(value);
  };
  const changeBackground = (value: string) => {
    setBackground(value);
    editor?.changeBackground(value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editor?.changeSize(parseInt(width, 10), parseInt(height, 10));
  };
  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "settings" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="Settings" description="Workspace Settings" />

      <ScrollArea>
        <div className="p-4 space-y-6">
          <form className="space-y-4 p-4 " onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label>Height</Label>
              <Input
                placeholder="Height"
                value={height}
                type="number"
                onChange={(e) => changeHeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Width</Label>
              <Input
                placeholder="Height"
                value={width}
                type="number"
                onChange={(e) => changeWidth(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Resize
            </Button>
          </form>
          <div className="p-4">
            <ColorPicker
              value={background as string}
              onChange={changeBackground}
            />
          </div>
        </div>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default SettingsSidebar;
