import { Routes, Route, Link } from "react-router-dom";
import HeroList from "./pages/HeroList";
import HeroDetail from "./pages/HeroDetail";

function App() {
  return (
    <div className="p-4">
      <nav className="mb-4">
        <Link to="/" className="text-blue-500">
          Heroes
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HeroList />} />
        <Route path="/superheroes/:id" element={<HeroDetail />} />
      </Routes>
    </div>
  );
}

export default App;
