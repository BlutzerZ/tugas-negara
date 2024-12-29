import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl } from "../../config/api";
import SuccessModal from "../../admin/components/SuccessModal";

const RegisterSupervisor = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "success",
    message: "",
    autoClose: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    region: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    name: "",
    region: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profilePicture: "",
  });

  const toggleDarkMode = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("color-theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (storedTheme === "dark" || (storedTheme === null && prefersDarkMode)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [navigate]);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Format email tidak valid";
      isValid = false;
    }

    // Name validation
    if (formData.name.length < 3) {
      errors.name = "Nama minimal 3 karakter";
      isValid = false;
    }

    // Region validation
    if (!formData.region) {
      errors.region = "Pilih wilayah";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,13}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Nomor telepon tidak valid (10-13 digit)";
      isValid = false;
    }

    // Password validation
    if (formData.password.length < 6) {
      errors.password = "Password minimal 6 karakter";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password tidak cocok";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        setFormErrors((prev) => ({
          ...prev,
          profilePicture: "Ukuran file tidak boleh lebih dari 2MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          profilePicture: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataSubmit = new FormData();
    formDataSubmit.append("email", formData.email);
    formDataSubmit.append("name", formData.name);
    formDataSubmit.append("username", formData.email);
    formDataSubmit.append("region", formData.region);
    formDataSubmit.append("phone", formData.phone);
    formDataSubmit.append("password", formData.password);
    formDataSubmit.append("image", formData.profilePicture);
    if (!validateForm()) {
      setModalConfig({
        type: "error",
        message: "Mohon periksa kembali form anda",
        autoClose: false,
      });
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.USER.LIST),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: formDataSubmit,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData.detail.type == "IntegrityError") {
          throw new Error("Akun sudah ada");
        } else {
          throw new Error("Gagal membuat akun");
        }
      }

      setModalConfig({
        type: "success",
        message: "Berhasil Menambahkan Akun Supervisor",
        autoClose: true,
      });
      setShowModal(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error:", error.message);
      setModalConfig({
        type: "error",
        message: `Gagal membuat akun: ${error.message}`,
        autoClose: false,
      });
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 space-y-8 bg-white rounded-lg shadow dark:bg-gray-800 relative">
          <button
            onClick={toggleDarkMode}
            type="button"
            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
          </button>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Tambah Akun Supervisor
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.email ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="name@company.com"
                required
                disabled={isLoading}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
              )}
            </div>

            {/* Name Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.name ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                required
                disabled={isLoading}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
              )}
            </div>

            {/* Region Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Wilayah
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.region ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                required
                disabled={isLoading}
              >
                <option value="">--- Pilih Wilayah ---</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
              {formErrors.region && (
                <p className="mt-1 text-sm text-red-500">{formErrors.region}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.phone ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                required
                disabled={isLoading}
              />
              {formErrors.phone && (
                <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Foto Profil
              </label>
              <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                  <img
                    className="w-24 h-24 object-cover rounded-full border-4 border-gray-200 dark:border-gray-700"
                    src={previewImage || "https://via.placeholder.com/150"}
                    alt="Preview foto profil"
                  />
                </div>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-2 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Klik untuk upload</span>{" "}
                        atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG (MAX. 2MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      required
                    />
                  </label>
                </div>
                {formErrors.profilePicture && (
                  <p className="mt-2 text-sm text-red-500">
                    {formErrors.profilePicture}
                  </p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.password ? "border-red-500" : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Konfirmasi Kata Sandi
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`bg-gray-50 border ${
                  formErrors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Memproses...
                </div>
              ) : (
                "Buat Akun"
              )}
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          if (modalConfig.type === "success") {
            window.location.href = "/login";
          }
        }}
        message={modalConfig.message}
        type={modalConfig.type}
        autoClose={modalConfig.autoClose}
      />
    </>
  );
};

export default RegisterSupervisor;
