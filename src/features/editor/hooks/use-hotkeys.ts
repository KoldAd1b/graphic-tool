import { fabric } from "fabric";

import { useEvent } from "react-use";
type Props = {
  canvas: fabric.Canvas | null;
  undo: () => void;
  redo: () => void;

  save: (skip?: boolean) => void;
  copy: () => void;
  paste: () => void;
};

export const useHotkeys = ({
  undo,
  redo,
  canvas,
  save,
  paste,
  copy,
}: Props) => {
  useEvent("keydown", (e) => {
    const isControlKey = e.ctrlKey || e.metaKey;
    const isBackspace = e.key === "Backspace";

    const isInput = ["INPUT", "TEXTAREA"].includes(
      (e.target as HTMLElement).tagName
    );

    if (isInput) return;

    if (isBackspace) {
      canvas?.remove(...canvas.getActiveObjects());
      canvas?.discardActiveObject();
    }
    if (isControlKey && e.key === "z") {
      e.preventDefault();
      undo();
    }
    if (isControlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }
    if (isControlKey && e.key === "c") {
      e.preventDefault();
      copy();
    }
    if (isControlKey && e.key === "v") {
      e.preventDefault();
      paste();
    }
    if (isControlKey && e.key === "s") {
      e.preventDefault();
      save(true);
    }
    if (isControlKey && e.key === "a") {
      e.preventDefault();
      canvas?.discardActiveObject();

      const allObjects = canvas
        ?.getObjects()
        .filter((object) => object.selectable);

      canvas?.setActiveObject(
        new fabric.ActiveSelection(allObjects, { canvas })
      );
      canvas?.renderAll();
    }
  });
};
