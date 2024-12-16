import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";

const EditStore = () => {
  const { store_id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState(null);
  const [formData, setFormData] = useState({});
  const [mapCenter, setMapCenter] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
          {
            method: "GET",
            headers: getAuthHeader(),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { id, products, image, ...filteredData } = data.data;
        setStore(data.data);
        setFormData(filteredData);
        setMapCenter(data.data.loc.replace(/[()]/g, "").split(",").map(Number));
        setMarkerPosition(
          data.data.loc.replace(/[()]/g, "").split(",").map(Number)
        );
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, []);

  const ChangeMapCenter = ({ center }) => {
    const map = useMap();
    map.setView(center);
    return null;
  };

  const LocationPicker = ({ position, setPosition }) => {
    const map = useMap();

    useEffect(() => {
      map.on("click", (e) => {
        setPosition([e.latlng.lat, e.latlng.lng]);
      });
    }, [map]);

    return position ? <Marker position={position} /> : null;
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      loc: `(${markerPosition[0]}, ${markerPosition[1]})`,
    }));
  }, [markerPosition]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = [latitude, longitude];
          setMapCenter(newPosition);
          setMarkerPosition(newPosition);
          setFormData((prev) => ({
            ...prev,
            loc: `(${markerPosition[0]}, ${markerPosition[1]})`,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    Object.keys(formData).forEach((key) => {
      uploadData.append(key, formData[key]);
    });

    try {
      const response = await fetch(
        createApiUrl(API_CONFIG.ENDPOINTS.STORES.DETAIL, { id: store_id }),
        {
          method: "PUT",
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
      console.log("Detail Toko berhasil Diubah:", data);
      alert("Detail Toko berhasil Diubah!");

      navigate("/stores");
    } catch (error) {
      console.error("Error:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  if (!store) return <div>Loading...</div>;

  return (
    <>
      {/* Header Section */}
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
                      Edit Toko
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
              Edit Detail Toko
            </h1>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Detail Toko
            </h3>
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

              <div className="lg:col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                ></textarea>
              </div>

              {/* Lokasi Map */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Lokasi Toko
                </label>

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
                    <ChangeMapCenter center={mapCenter} />
                    <LocationPicker
                      position={markerPosition}
                      setPosition={setMarkerPosition}
                    />
                  </MapContainer>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Koordinat: {formData.loc}
                </div>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="mt-4 w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  Gunakan Lokasi Saat Ini
                </button>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Foto Toko
                </label>
                <img
                  src={`${API_CONFIG.BASE_URL}/${store.image}`}
                  alt=""
                  className="h-[400px] mx-auto mb-11"
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Simpan Perubahan
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

export default EditStore;
