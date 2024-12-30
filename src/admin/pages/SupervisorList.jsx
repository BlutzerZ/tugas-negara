import { useState, useEffect } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { API_CONFIG, createApiUrl } from "../../config/api";
import SuccessModal from "../../admin/components/SuccessModal";

const SupervisorList = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryValue = queryParams.get("region");

  const regions = [
    "Jakarta",
    "Banten",
    "Bandung",
    "Bogor",
    "Cianjur",
    "Garut",
    "Karawang",
    "Subang",
    "Sukabumi",
    "Lampung",
    "Palembang",
  ];

  const fetchSupervisors = async () => {
    try {
      const url = new URL(createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST));
      url.searchParams.append("order", "asc");
      url.searchParams.append("include_deleted", "false");
      url.searchParams.append("role_type", "supervisor");
      url.searchParams.append("sort_by", "name");
      url.searchParams.append("search_query", searchTerm);

      if (queryValue) {
        url.searchParams.append("region", queryValue);
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSales(data.data);
    } catch (error) {
      setSales([]);
      console.error("Gagal mengambil data supervisor:", error);
    }
  };

  useEffect(() => {
    fetchSupervisors();
  }, [queryValue, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedSupervisor(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setModalConfig({
          type: 'error',
          message: 'File terlalu besar. Maksimum ukuran file adalah 2MB',
          autoClose: false
        });
        setShowModal(true);
        return;
      }

      if (!file.type.startsWith('image/')) {
        setModalConfig({
          type: 'error',
          message: 'Hanya file gambar yang diperbolehkan',
          autoClose: false
        });
        setShowModal(true);
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      setProfileImage(previewUrl);
      
      setSelectedSupervisor(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", selectedSupervisor.email);
      formData.append("name", selectedSupervisor.name);
      formData.append("phone", selectedSupervisor.phone);
      formData.append("region", selectedSupervisor.region);
      
      if (selectedSupervisor.image instanceof File) {
        formData.append("image", selectedSupervisor.image);
      }

      const response = await fetch(
        createApiUrl(`${API_CONFIG.ENDPOINTS.USER.LIST}/${selectedSupervisor.id}`),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Gagal memperbarui data supervisor");
      }

      setModalConfig({
        type: "success",
        message: "Data supervisor berhasil diperbarui",
        autoClose: true,
      });
      setShowModal(true);
      setShowEditModal(false);
      fetchSupervisors();
    } catch (error) {
      setModalConfig({
        type: "error",
        message: error.message,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        createApiUrl(`${API_CONFIG.ENDPOINTS.USER.LIST}/${selectedSupervisor.id}`),
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal menghapus supervisor");
      }

      setModalConfig({
        type: "success",
        message: "Supervisor berhasil dihapus",
        autoClose: true,
      });
      setShowModal(true);
      setShowDeleteModal(false);
      setShowEditModal(false);
      fetchSupervisors();
    } catch (error) {
      setModalConfig({
        type: "error",
        message: error.message,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Header Section */}
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              {queryValue ? `Supervisor - ${queryValue}` : "Semua Supervisor"}
            </h1>
          </div>
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <form className="flex items-center w-full md:w-1/2">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Cari supervisor..."
              />
            </form>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Nama Supervisor
                    </th>
                    <th scope="col" className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400">
                      Wilayah
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {sales.map((supervisor) => (
                    <tr
                      key={supervisor.id}
                      onClick={() => {
                        setSelectedSupervisor(supervisor);
                        setProfileImage(`${API_CONFIG.BASE_URL}/${supervisor.image}`);
                        setShowEditModal(true);
                      }}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <td className="p-4">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {supervisor.name}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">
                        {supervisor.region}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Edit */}
      {showEditModal && selectedSupervisor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800 overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Edit Supervisor
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-700"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedSupervisor(null);
                  }}
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="mb-6 text-center">
                <div className="mb-4">
                  <img
                    src={profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-2 object-cover"
                  />
                </div>
                <div>
                  <label
                    htmlFor="profile-picture"
                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <span>Ubah Foto Profil</span>
                    <input
                      type="file"
                      id="profile-picture"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="grid gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={selectedSupervisor.email}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={selectedSupervisor.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={selectedSupervisor.phone}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Wilayah
                  </label>
                  <select
                    name="region"
                    value={selectedSupervisor.region}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  >
                    <option value="">--- Pilih Wilayah ---</option>
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedSupervisor(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && selectedSupervisor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Apakah Anda yakin ingin menghapus supervisor {selectedSupervisor.name}?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900"
              >
                {isLoading ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Sukses/Error */}
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

export default SupervisorList;
