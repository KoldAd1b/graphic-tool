"use client";
import React from "react";
import Editor from "@/features/editor/editor";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    projectId: string;
  };
};

const EditorProjectId = ({ params: { projectId } }: Props) => {
  const { data, isLoading, isError } = useGetProject(projectId);

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <TriangleAlert className="size-6  text-muted-foreground" />
        <p className="text-muted-foreground text-sm">
          Failed to get the project
        </p>
        <Button asChild variant={"secondary"}>
          <Link href={"/"}>Back to Home</Link>
        </Button>
      </div>
    );
  }
  if (data) {
    return <Editor initialData={data} />;
  }
};

export default EditorProjectId;
