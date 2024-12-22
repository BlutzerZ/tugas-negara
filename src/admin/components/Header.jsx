import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const Header = ({ toggleSidebar, isSidebarOpen }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const fetchProfileData = async () => {
    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.PROFILE),
        {
          method: "GET",
          headers: getAuthHeader(),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }
      
      const data = await response.json();
      setProfile(data.data);
      
      if (data.data.image) {
        const imageUrl = `${API_CONFIG.BASE_URL}/${data.data.image}`;
        setProfilePhoto(imageUrl);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();

    // Event listener untuk update foto profil
    const handleProfileUpdate = () => {
      const savedProfileImage = localStorage.getItem('profileImage');
      if (savedProfileImage) {
        setProfilePhoto(savedProfileImage);
      }
    };

    // Event listener untuk update data user
    const handleUserDataUpdate = (event) => {
      setProfile(prev => ({
        ...prev,
        name: event.detail.name,
        email: event.detail.email
      }));
    };

    window.addEventListener('profileImageUpdated', handleProfileUpdate);
    window.addEventListener('userDataUpdated', handleUserDataUpdate);

    // Check localStorage on mount
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfilePhoto(savedProfileImage);
    }

    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileUpdate);
      window.removeEventListener('userDataUpdated', handleUserDataUpdate);
    };
  }, []);

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event.target.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              aria-expanded={isSidebarOpen}
              className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {isSidebarOpen ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>

            <Link to="/" className="flex ml-2 md:mr-24">
              <img src="/images/logo.svg" className="h-8 mr-3" alt="Logo" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                L'Amor Parfumes
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              type="button"
              className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            </button>

            <div className="flex items-center ml-3 relative profile-dropdown">
              <button
                type="button"
                onClick={toggleProfileDropdown}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={profilePhoto || "https://via.placeholder.com/150"}
                  alt="user photo"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 top-10 z-50 my-4 w-56 text-base list-none bg-white rounded-lg shadow dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-600">
                  <div className="px-4 py-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {profile?.name || 'Loading...'}
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                      {profile?.email || 'Loading...'}
                    </p>
                  </div>
                  <ul className="py-1">
                    <li>
                      <Link
                        to="/profile"
                        onClick={toggleProfileDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profil Saya
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/setting"
                        onClick={toggleProfileDropdown}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Pengaturan
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Keluar
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
