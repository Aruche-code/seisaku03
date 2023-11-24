import "./globals.css";
import Navigation from "./components/navigation";
import Sidebar from "./components/sidebar";

export const metadata = {
  title: "AI-SaaS",
  description: "AI-SaaS",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja">
      <body>
        <div className="flex flex-col h-screen">
          {/* <Navigation /> */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <div className="flex flex-col flex-1 py-2.5 pr-4 overflow-auto">
              <main className="flex-1 container max-w-screen-xl mx-auto py-2 pr-4 ">
                {children}
              </main>
              {/* <footer className="border-t py-5"> */}
              {/* <div className="text-center text-sm">development</div> */}
              {/* </footer> */}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
