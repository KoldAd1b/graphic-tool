import React from "react";

type Props = {
  title: string;
  description?: string;
};

const ToolSidebarHeader = ({ title, description }: Props) => {
  return (
    <div className="p-4 border-b space-y-1 h-[68px]">
      <p className="text-sm font-medium"></p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default ToolSidebarHeader;
