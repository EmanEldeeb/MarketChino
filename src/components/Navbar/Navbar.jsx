import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../context/Usercontext";
function Navbar() {
  const { isLogged, setIsLogged } = useUser();
  const navigate = useNavigate();
  function handlelogout() {
    localStorage.removeItem("_token");
    setIsLogged(false);
    navigate("/login");
  }
  return (
    <header className=" bg-slate-400">
      <nav className="flex gap-5   container mx-auto items-center px-2 md:px-0">
        <div>
          <NavLink to="/">
            <img
              src="../../../public/logo.png"
              alt="marketchino logo"
              width={40}
            />
          </NavLink>
        </div>
        <div className="md:hidden ms-auto">
          <i className="fa-solid fa-bars-staggered"></i>
        </div>
        <div className=" hidden md:flex md:flex-1  ">
          {isLogged && (
            <ul className="flex items-center gap-6 ms-5">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Cart</NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/categories">Categories</NavLink>
              </li>
              <li>
                <NavLink to="/brands">Brands</NavLink>
              </li>
            </ul>
          )}
          <div className="flex gap-6 items-center ms-auto">
            <ul className="flex items-center gap-4">
              <li>
                <i className="fa-brands fa-facebook"></i>
              </li>
              <li>
                <i className="fa-brands fa-instagram"></i>
              </li>
              <li>
                <i className="fa-brands fa-twitter"></i>
              </li>
            </ul>
            <ul className="flex items-center gap-4">
              {!isLogged && (
                <>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </>
              )}
              {isLogged && (
                <span onClick={handlelogout} role="button">
                  logout
                </span>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
