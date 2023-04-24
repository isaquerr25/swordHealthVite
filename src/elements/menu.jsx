import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/menu.css';
import { isLogout } from '../tools/managerUser';

function Menu() {
  const location = useLocation();
  const router = useNavigate();
  return (
    <nav className="bg-[#80808056]">
      <div className=" px-[4rem]">
        <div className="flex items-center justify-between h-16">
          <div className=" flex justify-center items-baseline gap-x-[3rem]">
            <div className="">
              <h1>LOGO</h1>
            </div>
            <Link
              data-test="btn-discovery"
              to="/discovery"
              className={`menu-item !mr-[auto] ${
                location.pathname === '/discovery' ? ' !underline ' : ''
              }`}
            >
              Discovery
            </Link>
          </div>
          <div className="">
            <div className="flex justify-center  items-baseline w-[100%] gap-x-[3rem]">
              <Link
                data-test="btn-username"
                to="/profile"
                className={`menu-item${
                  location.pathname === '/profile' ? ' !underline ' : ''
                }`}
              >
                Username
              </Link>
              <button
                type="button"
                data-test="btn-logout"
                onClick={() => isLogout() && router('/')}
                className={`cursor-pointer menu-item ${
                  location.pathname === '/logout' ? ' !underline ' : ''
                }`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
