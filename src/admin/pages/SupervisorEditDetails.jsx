import { useState, useEffect } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import SuccessModal from "../components/SuccessModal";
import { useParams } from "react-router-dom";

const SupervisorEditDetail = () => {
  const { supervisor_id } = useParams();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST) + `/${supervisor_id}`,
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
        setModalConfig({
          type: "error",
          message: "Gagal mengambil data profil",
          autoClose: false,
        });
        setShowModal(true);
      }
    };
    fetchStores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (userData.newPassword !== userData.confirmPassword) {
        setModalConfig({
          type: "error",
          message: "Password baru dan konfirmasi password tidak cocok",
          autoClose: false,
        });
        setShowModal(true);
        return;
      }

      const responseUser = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST) + `/${supervisor_id}`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            new_name: userData.name,
            new_phone: userData.phone,
            old_password: userData.currentPassword,
            new_password:
              userData.newPassword === userData.confirmPassword
                ? userData.newPassword
                : null,
          }),
        }
      );

      if (!responseUser.ok) {
        const errorData = await responseUser.json();
        throw new Error(errorData.message || "Failed to update user data");
      }

      const data = await responseUser.json();
      setUserData(data.data);

      // Dispatch event untuk update header
      window.dispatchEvent(
        new CustomEvent("userDataUpdated", {
          detail: {
            name: data.data.name,
            email: data.data.email,
          },
        })
      );

      setModalConfig({
        type: "success",
        message: "Data berhasil diperbarui",
        autoClose: true,
      });
      setShowModal(true);

      // Reset password fields
      setUserData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error:", error.message);
      setModalConfig({
        type: "error",
        message: `Gagal memperbarui data: ${error.message}`,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Edit Data Supervisor
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={userData.name || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={userData.phone || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Ubah Password
              </h3>
              <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={userData.currentPassword || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={userData.newPassword || ""}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    value={userData.confirmPassword || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalConfig.message}
        type={modalConfig.type}
        autoClose={modalConfig.autoClose}
      />
    </>
  );
};

export default SupervisorEditDetail;
