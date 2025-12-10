import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MeetingRequest from "./pages/MeetingRequest";
import DataRoomRequest from "./pages/DataRoomRequest";
import NotFound from "./pages/NotFound";
import TeamExport from "./pages/TeamExport";
import ProductsExport from "./pages/ProductsExport";
import TokenomicsExport from "./pages/TokenomicsExport";
import Financials from "./pages/Financials";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/team-export" element={<TeamExport />} />
          <Route path="/products-export" element={<ProductsExport />} />
          <Route path="/tokenomics-export" element={<TokenomicsExport />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/" element={<Home />} />
          <Route path="/meeting" element={<MeetingRequest />} />
          <Route path="/request-access" element={<DataRoomRequest />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
