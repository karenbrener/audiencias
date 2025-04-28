
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AppLayout from "./components/layout/AppLayout";
import AudienciasIndex from "./pages/audiencias/AudienciasIndex";
import AudienciasConstructor from "./pages/audiencias/AudienciasConstructor";
import CampanasIndex from "./pages/campanas/CampanasIndex";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/audiencias" element={<AppLayout><AudienciasIndex /></AppLayout>} />
          <Route path="/audiencias/constructor" element={<AppLayout><AudienciasConstructor /></AppLayout>} />
          <Route path="/campanas" element={<AppLayout><CampanasIndex /></AppLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
