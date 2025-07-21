import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/home/Home";
import Problem1 from "./pages/problem-1/Problem1";
import Problem2 from "./pages/problem-2/Problem2";
import Problem3 from "./pages/problem-3/Problem3";
import ProblemLayout from "./layout/ProblemLayout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              index
              element={<Home />}
            />
            <Route path="problem-1" element={<ProblemLayout><Problem1 /></ProblemLayout>} />
            <Route path="problem-2" element={<ProblemLayout><Problem2 /></ProblemLayout>} />
            <Route path="problem-3" element={<ProblemLayout><Problem3 /></ProblemLayout>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
