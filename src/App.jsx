import { useState, useEffect } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Background from "./components/Background";
import CommandK from "./components/CommandK";

import Home from "./pages/Home";
import CV from "./pages/CV";
import Project from "./pages/Project";
import NotFound from "./pages/NotFound";

/**
 * Wraps the project page to remount it when the route slug changes.
 *
 * This helps reset the project page state when navigating between projects.
 *
 * @returns {JSX.Element} Rendered project page.
 */
function ProjectWrapper() {
  const { slug } = useParams();

  return <Project key={slug} />;
}

/**
 * Main application component.
 *
 * It renders the global layout, the command menu, and the application routes.
 *
 * @returns {JSX.Element} Rendered application.
 */
function App() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    /**
     * Toggles the command menu with Ctrl+K or Cmd+K.
     *
     * @param {KeyboardEvent} e - Keyboard event triggered by the user.
     */
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Background />
      <MobileNav />
      <Header onOpenCmd={() => setCmdOpen(true)} />
      <CommandK open={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/project/:slug" element={<ProjectWrapper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
