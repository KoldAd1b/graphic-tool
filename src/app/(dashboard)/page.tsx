import Image from "next/image";
import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";
import Banner from "./banner";
import { TemplatesSection } from "./template-section";
import { ProjectsSection } from "./projects-section";

export default async function Home() {
  const session = await auth();

  await protectServer();

  return (
    <div className="flex flex-col space-y-6 max-w-screen-xl mx-auto pb-10">
      <Banner />
      <TemplatesSection />
      <ProjectsSection />
    </div>
  );
}
