import React, { useEffect } from "react";

type Props = {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (object: fabric.Object[]) => void;
  clearSelectionCb?: () => void;
};

const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCb,
}: Props) => {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", (e) => {
        save();
      });
      canvas.on("object:modified", (e) => {
        save();
      });
      canvas.on("object:removed", (e) => {
        save();
      });
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", (e) => {
        setSelectedObjects([]);
        // You can optionally call a funciton like this
        clearSelectionCb?.();
      });
    }
    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:cleared");
        canvas.off("selection:updated");
        canvas.off("object:removed");
        canvas.off("object:added");
        canvas.off("object:modified");
      }
    };
  }, [canvas, clearSelectionCb, save]);
  return {};
};

export default useCanvasEvents;
