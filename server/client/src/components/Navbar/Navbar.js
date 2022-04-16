import React from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../helper/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert2';
import style from "./Navbar.module.scss";

function Navbar() {

  const { authState, setAuthState } = useContext(AuthContext);
  let history = useNavigate();

  function handlelogout() {
    sessionStorage.removeItem("accessToken");
    setAuthState(false);
    swal.fire({
      icon: 'success',
      title: 'Logged out',
      showConfirmButton: false,
      timer: 1000,
    });
    history("/")
  }


  return (
    <nav>
        {authState ? (
          <>
            <table className={style.marg}>
              <tr>
              <td className="mr-100">
                  <Link to="/">
                    <button
                      type="button"
                      className={[style.custom_button, "btn"].join(' ')}
                    >
                      Home
                    </button>
                  </Link>
                </td>
                <td className="mr-100">
                  <Link to="/borrow-request">
                    <button
                      type="button"
                      className={[style.custom_button, "btn"].join(' ')}
                    >
                      Borrow Request
                    </button>
                  </Link>
                </td>
                
                <td><button
                  type="button"
                  className={[style.custom_button, "btn"].join(' ')}
                  onClick={handlelogout}
                >
                  Logout
                </button>
                </td>
              </tr>
            </table>
          </>
        ) : (
          <>
            <table className={style.marg}>
                <tr>
                <Link to="/LoginPage">
              <button type="button" className={[style.custom_button, "btn"].join(' ')}>
                Login/Signup
              </button>
            </Link>
                </tr>
            </table>
            
          </>
        )}
    </nav>
  );
}

export default Navbar;