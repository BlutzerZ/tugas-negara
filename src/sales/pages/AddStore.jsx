import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_CONFIG, createApiUrl, getAuthHeader } from "../../config/api";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Komponen untuk mengatur center peta
const ChangeMapCenter = ({ center }) => {
  const map = useMap();
  map.setView(center);
  return null;
};

// Komponen untuk menangani klik pada peta
const LocationPicker = ({ position, setPosition }) => {
  const map = useMap();

  useEffect(() => {
    map.on('click', (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    });
  }, [map]);

  return position ? <Marker position={position} /> : null;
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
  const [markerPosition, setMarkerPosition] = useState([-6.200000, 106.816666]);

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

  // Update formData saat marker berubah
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lat: markerPosition[0],
      lng: markerPosition[1]
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
      {/* ... Header section sama seperti sebelumnya ... */}

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... Form fields lainnya sama seperti sebelumnya ... */}

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
                <ChangeMapCenter center={mapCenter} />
                <LocationPicker 
                  position={markerPosition}
                  setPosition={setMarkerPosition}
                />
              </MapContainer>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              Koordinat: {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
            </div>
          </div>

          {/* ... Tombol submit dan cancel sama seperti sebelumnya ... */}
        </form>
      </div>
    </>
  );
};

export default AddStore;
