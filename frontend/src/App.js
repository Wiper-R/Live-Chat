import { useDispatch } from "react-redux";
import { LoadUser } from "./store/Reducers/AuthReducer";
import ChatApp from "./Pages/ChatApp";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Pages/Login";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadUser());
  }, [])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/" element={<PrivateRoute/>}>
          <Route exact path="/" element={<ChatApp/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
