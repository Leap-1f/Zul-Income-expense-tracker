import { useRouter } from "next/router";
import { Vector } from "../utils/IconGeld";
import Link from "next/link";
import { useEffect } from "react";
export const Navbar = ({ setShowAddRecordPopUp }) => {
  const {push} = useRouter();
  const logOut = () => {
    localStorage.removeItem('id');
        push("/");
  }
  const handleDashboard = () => {
    const id = localStorage.getItem('id');
    if (id) {
      push('/dashboard');
    } else {
      push('/');
    }
  }
  const handleRecord = () => {
    const id = localStorage.getItem('id');
    if (id) {
      push('/record');
    } else {
      push('/');
    }
  }

  return (
    <div className="bg-white h-[8vh]">
      <div className="max-w-screen-lg navbar h-full m-auto ">
        <div className="flex-1 items-center gap-6">
          <Vector />
          <div onClick={handleDashboard}
            href="/dashboard"
            className="active:scale-95 transition visited:text-bold"
          >
            Dashboard
          </div>
          <div onClick={handleRecord} href="/record" className="active:scale-95 transition">
            Records
          </div>
        </div>
        <div className="flex-none items-center gap-6">
          <button
            onClick={() => setShowAddRecordPopUp(true)}
            className="btn btn-primary btn-sm rounded-full "
          >
            {" "}
            + Record
          </button>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
          
              <li onClick={logOut}>
                <a>Logout</a>
              </li>
           
              
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
