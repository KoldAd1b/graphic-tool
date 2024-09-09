"use client";
import React from "react";
import Logo from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useFilePicker } from "use-file-picker";
import {
  ChevronDown,
  Download,
  Loader,
  LucideMousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { LuMousePointerClick } from "react-icons/lu";
import Hint from "@/components/hint";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { ActiveTool, Editor } from "../types";
import { cn } from "@/lib/utils";
import UserButton from "@/features/auth/components/user-button";
import { useMutationState } from "@tanstack/react-query";

type Props = {
  activeTool: ActiveTool;
  editor: Editor | undefined;
  onChangeActiveTool: (tool: ActiveTool) => void;
  id: string;
};

const Navbar = ({ activeTool, editor, onChangeActiveTool, id }: Props) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();

        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadFromJSON(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full flex items-center p-4 h-[68px] gap-x-8  border-b lg:pl-[34px]  ">
      <Logo />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="ghost">
            File
            <ChevronDown className="size-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="min-w-60 z-[50] bg-white p-2"
        >
          {/* Pleae never import from radix ui */}
          <DropdownMenuItem
            onClick={() => {
              openFilePicker();
            }}
            className="flex items-center gap-x-2 relative"
          >
            <CiFileOn className="size-8" />
            <div>
              <p>Open</p>
              <p className="text-xs text-muted-foreground">Open a JSON file</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="mx-2" />
      <Hint label="Select" side="bottom" sideOffset={10}>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            onChangeActiveTool("select");
          }}
          className={cn(activeTool === "select" && "bg-gray-100")}
        >
          <LucideMousePointerClick />
        </Button>
      </Hint>
      <Hint label="Undo" side="bottom" sideOffset={10}>
        <Button
          disabled={!editor?.canUndo()}
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            editor?.onUndo();
          }}
          className=""
        >
          <Undo2 />
        </Button>
      </Hint>
      <Hint label="Redo" side="bottom" sideOffset={10}>
        <Button
          disabled={!editor?.canRedo()}
          variant={"ghost"}
          size={"icon"}
          onClick={() => {
            editor?.onRedo();
          }}
          className=""
        >
          <Redo2 />
        </Button>
      </Hint>
      <Separator orientation="vertical" className="mx-2" />

      {isPending && (
        <div className="flex items-center gap-x-2">
          <Loader className="size-4 animate-spin text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saving ...</div>
        </div>
      )}
      {!isPending && isError && (
        <div className="flex items-center gap-x-2">
          <BsCloudSlash className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Failed to save</div>
        </div>
      )}
      {!isPending && !isError && (
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
      )}
      <div className="ml-auto items-center flex gap-x-4">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"} variant={"ghost"}>
              Export
              <Download className="size-4 ml-2 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                editor?.saveJSON();
              }}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>JSON</p>
                <p className="text-xs text-muted-foreground">
                  Save later for editing
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                editor?.saveAsPng();
              }}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>PNG</p>
                <p className="text-xs text-muted-foreground">
                  Best for sharing on the web
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                editor?.saveJpeg();
              }}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>JPEG</p>
                <p className="text-xs text-muted-foreground">
                  Best for printing
                </p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => {
                editor?.saveSvg();
              }}
            >
              <CiFileOn className="size-8" />
              <div>
                <p>SVG</p>
                <p className="text-xs text-muted-foreground">
                  Best for editing in software
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
