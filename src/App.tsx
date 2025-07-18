import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/home/Home";
import Problem1 from "./pages/problem-1/Problem1";
import Problem2 from "./pages/problem-2/Problem2";
import Problem3 from "./pages/problem-3/Problem3";
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
            <Route path="problem-1" element={<Problem1 />} />
            <Route path="problem-2" element={<Problem2 />} />
            <Route path="problem-3" element={<Problem3 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
