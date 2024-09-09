import Navbar from "./navbar";
import Sidebar from "./sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="bg-muted min-h-screen ">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col min-h-full ">
        <Navbar />
        <main className="bg-white flex-1 overflow-auto lg:rounded-tl-2xl p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
