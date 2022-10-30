import "./App.css";
import Create from "./components/create";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Read from "./components/read";
import Update from "./components/update";
import EmployeeView from "./components/EmployeeView";
function App() {
  return (
    <div>
      <Router>
        <div className="main">
          <h1 className="main-header">Employee Management App</h1>
          <div>
            <Routes>
              <Route exact path="/create" element={<Create />} />
              <Route exact path="/" element={<Read />} />
              <Route exact path="/view" element={<EmployeeView />} />
              <Route exact path="/update" element={<Update />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
