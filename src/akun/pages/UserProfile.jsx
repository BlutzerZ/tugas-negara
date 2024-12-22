import { useState, useEffect } from "react";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import SuccessModal from "../../admin/components/SuccessModal";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    phone: "",
    region: "",
    image: null
  });
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: 'success',
    message: '',
    autoClose: true
  });

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.USER.PROFILE),
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
        setProfileImage(`${API_CONFIG.BASE_URL}/${data.data.image}`);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
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
      
      setUserData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      if (userData.image instanceof File) {
        formData.append("image", userData.image);
      }

      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.PROFILE_PHOTO),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile photo");
      }

      const data = await response.json();
      const newImageUrl = `${API_CONFIG.BASE_URL}/${data.data.image}`;
      
      setProfileImage(newImageUrl);
      localStorage.setItem('profileImage', newImageUrl);
      window.dispatchEvent(new Event('profileImageUpdated'));

      setModalConfig({
        type: 'success',
        message: 'Profil berhasil diperbarui!',
        autoClose: true
      });
      setShowModal(true);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setModalConfig({
        type: 'error',
        message: `Gagal memperbarui profil: ${error.message}`,
        autoClose: false
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
              Profil Pengguna
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
                  className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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

            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
              </div>
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
                  value={userData.name}
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
                  value={userData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Wilayah
                </label>
                <select
                  id="region"
                  name="region"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={userData.region}
                  onChange={handleChange}
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

export default UserProfile;
