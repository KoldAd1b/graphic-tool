"use client";
import React, { useState } from "react";
import { ActiveTool, Editor, FONT_SIZE, FONT_WEIGHT } from "../types";
import Hint from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth, BsTransparency } from "react-icons/bs";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Copy,
  Trash,
} from "lucide-react";
import { isTextType } from "../utlis";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import FontSizeInput from "./fontsize-input";
import { IoColorFilter } from "react-icons/io5";

type Props = {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
};

const Toolbar = ({ onChangeActiveTool, editor, activeTool }: Props) => {
  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2" />
    );
  }

  const initialFillColor = editor?.getActiveFillColor();
  const initialStrokeColor = editor?.getActiveStrokeColor();
  const initialFontFamily = editor?.getActiveFontFamily();
  const initialFontStyle = editor?.getActiveFontStyle();
  const initialLineThroughStyle = editor?.getActiveFontLineThrough();
  const initialFontUnderline = editor?.getActiveFontUnderline();
  const initialTextAlign = editor?.getActiveTextAlign();
  const initialFontSize = editor?.getActiveFontSize() || FONT_SIZE;

  const initialFontWeight = editor?.getActiveFontWeight() || FONT_WEIGHT;

  const [properties, setProperties] = useState({
    fillColor: initialFillColor,
    strokeColor: initialStrokeColor,
    fontFamily: initialFontFamily,
    fontWeight: initialFontWeight,
    fontStyle: initialFontStyle,
    linethrough: initialLineThroughStyle,
    underline: initialFontUnderline,
    textAlign: initialTextAlign,
    fontSize: initialFontSize,
  });
  const selectedObjectType = editor?.selectedObjects[0].type;

  const isSelectText = isTextType(selectedObjectType);
  const isImage = selectedObjectType === "image";

  const onChangeFontSize = (value: number) => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }

    editor.changeFontSize(value);
    setProperties((current) => {
      return { ...current, fontSize: value };
    });
  };

  const toggleBold = () => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }
    const newValue = properties.fontWeight > 500 ? 500 : 700;
    editor.changeFontWeight(newValue);
    setProperties((current) => {
      return { ...current, fontWeight: newValue };
    });
  };
  const toggleItalic = () => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }
    const isItalic = properties.fontStyle === "italic";
    const newValue = isItalic ? "normal" : "italic";

    editor.changeFontStyle(newValue);
    setProperties((current) => {
      return { ...current, fontStyle: newValue };
    });
  };
  const toggleLineThrough = () => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }
    const isLineThrough = properties.linethrough === true;
    const newValue = isLineThrough ? false : true;

    editor.changeFontLineThrough(newValue);
    setProperties((current) => {
      return { ...current, linethrough: newValue };
    });
  };
  const toggleUnderline = () => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }
    const isUnderline = properties.underline === true;
    const newValue = isUnderline ? false : true;

    editor.changeFontUnderline(newValue);
    setProperties((current) => {
      return { ...current, underline: newValue };
    });
  };
  const onChangeTextAlign = (value: string) => {
    const selectedObject = editor?.selectedObjects;
    if (!selectedObject) {
      return;
    }
    editor?.changeTextAlign(value);

    setProperties((current) => ({ ...current, textAlign: value }));
  };

  return (
    <div className="shrink-0 h-[56px] border-b bg-white w-full flex items-center overflow-x-auto z-[49] p-2 gap-x-2">
      {!isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Color" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("fill");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "fill" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border"
                style={{
                  backgroundColor: properties.fillColor,
                }}
              ></div>
            </Button>
          </Hint>
        </div>
      )}
      {!isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Color" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-color");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "stroke-color" && "bg-gray-100")}
            >
              <div
                className="rounded-sm size-4 border-2 bg-white "
                style={{
                  borderColor: properties.strokeColor,
                }}
              ></div>
            </Button>
          </Hint>
        </div>
      )}

      {!isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Stroke Width" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("stroke-width");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "stroke-width" && "bg-gray-100")}
            >
              <BsBorderWidth className="size-4" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("font");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(
                "w-auto px-2 text-sm",
                activeTool === "font" && "bg-gray-100"
              )}
            >
              <div className="max-w-[100px] truncate ">
                {properties.fontFamily}
              </div>
              <ChevronDown className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Font" side={"bottom"} sideOffset={5}>
            <Button
              onClick={toggleBold}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontWeight > 500 && "bg-gray-100")}
            >
              <FaBold className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Italic" side={"bottom"} sideOffset={5}>
            <Button
              onClick={toggleItalic}
              size="icon"
              variant={"ghost"}
              className={cn(properties.fontStyle === "italic" && "bg-gray-100")}
            >
              <FaItalic className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Strikethrough" side={"bottom"} sideOffset={5}>
            <Button
              onClick={toggleLineThrough}
              size="icon"
              variant={"ghost"}
              className={cn(properties.linethrough && "bg-gray-100")}
            >
              <FaStrikethrough className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Underline" side={"bottom"} sideOffset={5}>
            <Button
              onClick={toggleUnderline}
              size="icon"
              variant={"ghost"}
              className={cn(properties.underline && "bg-gray-100")}
            >
              <FaUnderline className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Left" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeTextAlign("left");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "left" && "bg-gray-100")}
            >
              <AlignLeft className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Center" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeTextAlign("center");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "center" && "bg-gray-100")}
            >
              <AlignCenter className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Align Right" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeTextAlign("right");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(properties.textAlign === "right" && "bg-gray-100")}
            >
              <AlignRight className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}
      {isSelectText && (
        <div className="flex items-center h-full justify-center">
          <FontSizeInput
            onChange={onChangeFontSize}
            value={properties.fontSize}
          />
        </div>
      )}
      {isImage && (
        <div className="flex items-center h-full justify-center">
          <Hint label="Filters" side={"bottom"} sideOffset={5}>
            <Button
              onClick={() => {
                onChangeActiveTool("filter");
              }}
              size="icon"
              variant={"ghost"}
              className={cn(activeTool === "filter" && "bg-gray-100")}
            >
              <IoColorFilter className="size-4 ml-2 shrink-0" />
            </Button>
          </Hint>
        </div>
      )}

      <div className="flex items-center h-full justify-center">
        <Hint label="Bring Forward" side={"bottom"} sideOffset={5}>
          <Button
            onClick={() => editor?.bringForward()}
            size="icon"
            variant={"ghost"}
          >
            <ArrowUp className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Send backwards" side={"bottom"} sideOffset={5}>
          <Button
            onClick={() => {
              editor?.sendBackward();
            }}
            size="icon"
            variant={"ghost"}
          >
            <ArrowDown className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Opacity" side={"bottom"} sideOffset={5}>
          <Button
            onClick={() => {
              onChangeActiveTool("opacity");
            }}
            size="icon"
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <BsTransparency className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Delete" side={"bottom"} sideOffset={5}>
          <Button
            onClick={() => {
              editor?.delete();
            }}
            size="icon"
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <Trash className="size-4" />
          </Button>
        </Hint>
      </div>
      <div className="flex items-center h-full justify-center">
        <Hint label="Duplicate" side={"bottom"} sideOffset={5}>
          <Button
            onClick={() => {
              editor?.copy();
              editor?.paste();
            }}
            size="icon"
            variant={"ghost"}
            className={cn(activeTool === "opacity" && "bg-gray-100")}
          >
            <Copy className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default Toolbar;
