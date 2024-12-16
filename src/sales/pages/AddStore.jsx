import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Komponen untuk menangani klik pada peta
const LocationPicker = ({ onLocationSelect }) => {
  const [position, setPosition] = useState(null);

  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      onLocationSelect(lat, lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const AddStore = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    num: "",
    lat: -6.200000,
    lng: 106.816666,
    stock_30ml: 0,
    stock_roll_on: 0,
    stock_20ml: 0,
    image: null,
  });
  const [mapCenter, setMapCenter] = useState([-6.200000, 106.816666]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData(prev => ({
      ...prev,
      lat: lat,
      lng: lng
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setFormData(prev => ({
            ...prev,
            lat: latitude,
            lng: longitude
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Tidak dapat mendapatkan lokasi. Pastikan GPS aktif.");
        }
      );
    } else {
      alert("Browser Anda tidak mendukung geolokasi");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.STORES.LIST),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: uploadData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menambahkan toko");
      }

      const data = await response.json();
      console.log("Toko berhasil ditambahkan:", data);
      alert("Toko berhasil ditambahkan!");
      navigate("/stores");
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mb-1">
          <div className="mb-4">
            <nav className="flex mb-5" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                  <Link
                    to="/stores"
                    className="text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white"
                  >
                    Toko
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-400 ml-1 md:ml-2 dark:text-gray-500">
                      Tambah
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Tambah Toko
            </h1>
          </div>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nama Toko
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nomor Telepon
              </label>
              <input
                type="text"
                name="num"
                value={formData.num}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Alamat
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              />
            </div>

            {/* Lokasi Map */}
            <div className="col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Lokasi Toko
              </label>
              <button
                type="button"
                onClick={getCurrentLocation}
                className="mb-4 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Gunakan Lokasi Saat Ini
              </button>
              <div style={{ height: "400px", width: "100%" }}>
                <MapContainer
                  center={mapCenter}
                  zoom={13}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <LocationPicker onLocationSelect={handleLocationSelect} />
                </MapContainer>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Koordinat: {formData.lat}, {formData.lng}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Foto Toko
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Tambah Toko
            </button>
            <Link
              to="/stores"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStore;
