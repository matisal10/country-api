import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Countries from "./components/Countries";
import Header from './components/Header'
import Country from './components/Country'
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <body className="w-full h-full bg-gray-100 dark:bg-gray-900">
        <Header />
        <Routes>
          <Route exact path="/" element={<Countries />} />
          <Route exact path="/:name" element={<Country />} />
          <Route exact path="*" element={<Error />} />
        </Routes>
      </body>
    </Router>
  );
}

export default App;
