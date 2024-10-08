import React from "react";
import { ActiveTool, Editor } from "../types";
import { cn } from "@/lib/utils";
import ToolSidebarHeader from "./tool-sidebar-header";
import ToolSidebarClose from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined; //CHANGE TYPE
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const AISidebar = ({ activeTool, onChangeActiveTool, editor }: Props) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "ai" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />

      <ScrollArea>
        <form className="p-4 space-y-6">
          <Textarea
            placeholder="Something"
            cols={30}
            rows={10}
            required
            minLength={3}
          />
          <Button type="submit" className="w-full">
            Generate
          </Button>
        </form>
      </ScrollArea>
      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};

export default AISidebar;
