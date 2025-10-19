// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import Comparison from "./sections/Comparison";
import Quiz from "./sections/Quiz";
import TransparencyAI from "./sections/TransparencyAI";
import Values from "./sections/Values";

import { Box } from "@mui/material";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Box >{children}</Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Hero />
            </Layout>
          }
        />
        <Route
          path="/quiz"
          element={
            <Layout>
              <Quiz />
            </Layout>
          }
        />
        <Route
          path="/chatbox"
          element={
            <Layout>
              <Comparison />
            </Layout>
          }
        />
        <Route
          path="/transparency-ai"
          element={
            <Layout>
              <TransparencyAI />
            </Layout>
          }
        />
        <Route path="/qa" element={<Layout><Values /></Layout>} />
      </Routes>
      

    </Router>
  );
}

export default App;
