import { Routes, Route } from "react-router-dom";
import HeroesPage from "./pages/HeroesPage";
import HeroDetailPage from "./pages/HeroDetailPage";
import NewHeroPage from "./pages/NewHeroPage";

import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="p-4">
        <Routes>
          <Route path="/" element={<HeroesPage />} />
          <Route path="/superheroes/:id" element={<HeroDetailPage />} />
          <Route path="/superheroes/new" element={<NewHeroPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
