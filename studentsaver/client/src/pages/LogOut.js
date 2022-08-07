import { useNavigate } from "react-router-dom";

function LogOut() {
  let navigate= useNavigate();

  function handleLogOut() {
    sessionStorage.setItem("userToken", '');
    sessionStorage.clear();
    navigate("/"); // whichever component you want it to route to
  }

  return (
    <button type="button" onClick={handleLogOut}>
      Go home
    </button>
  );
}

export default LogOut;