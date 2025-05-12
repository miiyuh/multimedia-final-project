import { Route, Switch } from "wouter";
import { Suspense, lazy, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import NotFound from "@/pages/not-found";
import { clickSound } from "@/utils/sound"; // Import the click sound

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const CaseFile = lazy(() => import("@/pages/case-file"));
const Evidence = lazy(() => import("@/pages/evidence"));
const EvidenceDetail = lazy(() => import("@/pages/evidence-detail"));
const Suspects = lazy(() => import("@/pages/suspects"));
const Tools = lazy(() => import("@/pages/tools"));
const Resources = lazy(() => import("@/pages/resources"));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex flex-col min-h-screen bg-dark-300">
    <div className="container mx-auto px-4 py-16 flex-grow">
      <Skeleton className="w-full h-[200px] mb-8 bg-dark-200" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="w-full h-[300px] bg-dark-200" />
        ))}
      </div>
    </div>
  </div>
);

function App() {
  // Add global button click sound
  useEffect(() => {
  const handleButtonClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      console.log("Button clicked:", target); // Log the button element
      clickSound.play(); // Play the click sound for all button clicks
    }
  };

  document.addEventListener("click", handleButtonClick);

  return () => {
    document.removeEventListener("click", handleButtonClick);
  };
}, []);

  return (
    <div className="flex flex-col min-h-screen bg-dark-300 text-light-200">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/case-file" component={CaseFile} />
            <Route path="/evidence" component={Evidence} />
            <Route path="/evidence/:id" component={EvidenceDetail} />
            <Route path="/suspects" component={Suspects} />
            <Route path="/tools" component={Tools} />
            <Route path="/resources" component={Resources} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;