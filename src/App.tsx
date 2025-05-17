import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FilaProvider } from "./context/FilaContexto";

import Index from "./pages/Index";
import TelaControle from "./pages/TelaControle";
import TelaPublica from "./pages/TelaPublica";
import PainelAnuncios from "./pages/PainelAnuncios";
import PerfilUsuario from "./pages/PerfilUsuario";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FilaProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/controle" element={<TelaControle />} />
            <Route path="/publica" element={<TelaPublica />} />
            <Route path="/anuncios" element={<PainelAnuncios />} />
            <Route path="/perfil" element={<PerfilUsuario />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FilaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
