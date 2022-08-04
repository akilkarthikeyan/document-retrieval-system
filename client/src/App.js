import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
  
import MainPage from "./pages/MainPage";
import PaperDetails from "./pages/PaperDetails";
import ErrorPage from "./pages/ErrorPage";
import OptionInsert from "./pages/OptionInsert";
import InsertAuthor from "./pages/InsertAuthor"
import InsertPaper from "./pages/InsertPaper"
import InsertConf from "./pages/InsertConf"
import InsertJour from "./pages/InsertJour"
  
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path = "/" element = {<MainPage />} />
          <Route path = "/papers/:doi" element = {<PaperDetails />} />
          <Route path = "/papers/insert/" element = {<OptionInsert />}></Route>
          <Route path = "/papers/insert/author" element = {<InsertAuthor />}></Route>
          <Route path = "/papers/insert/paper" element = {<InsertPaper />}></Route>
          <Route path = "/papers/insert/jour" element = {<InsertJour />}></Route>
          <Route path = "/papers/insert/conf" element = {<InsertConf />}></Route>
          <Route path = "*" element = {<ErrorPage/ >} />
        </Routes>
      </Router>
    </>
  );
}
  
export default App;
