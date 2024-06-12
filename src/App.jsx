import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import JobDetails from "./pages/JobDetails.jsx"; // Import the new JobDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/job/:id" element={<JobDetails />} /> {/* Add new route for job details */}
      </Routes>
    </Router>
  );
}

export default App;
