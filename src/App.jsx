import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobDetails from "./pages/JobDetails.jsx";
import Login from "./pages/Login.jsx";
import { useSupabaseAuth } from "./integrations/supabase/auth.jsx";
import { Button } from "@chakra-ui/react";

function App() {
  const { session, logout } = useSupabaseAuth();

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    <div style={{ position: "fixed", top: 10, right: 10 }}>
        {session ? (
          <Button onClick={logout}>Logout</Button>
        ) : (
          <Button as={Link} to="/login">
            Login
          </Button>
        )}
      </div>
    </Router>
  );
}

export default App;
