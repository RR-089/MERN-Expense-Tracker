import AppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setUser } from "./store/auth.js";
import Cookies from "js-cookie";

function App() {

  const dispatch = useDispatch();

  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if(res.ok){
      const user = await res.json();
      dispatch(setUser(user));

    }
    setIsLoading(false);
    
  }

  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if(isLoading){
    return <p>Loading....</p>
  }

  return (
    <div>
      <AppBar />
      
      <Outlet />
    </div>
  );
}

export default App;
