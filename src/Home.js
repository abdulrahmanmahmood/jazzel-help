import React, { useEffect, useState } from "react";
import Navheader from "./components/Navheader";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Popup } from "react-leaflet";
import redIcon from "./assets/location.png";
import greenIcon from "./assets/gps.png";
import OrangeIcon from "./assets/placeholder.png";
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux state
import axios from "axios"; // Import Axios for HTTP requests

const Home = () => {
  const position = [19.999208860791935, 42.60094642639161]; // Default position
  const [persons, setPersons] = useState([]); // State variable to hold persons data

  const fetchPersons = async () => {
    try {
      const response = await axios.get(
        "http://jazlhelp.runasp.net/api/content"
      );
      setPersons(response.data);
      console.log("sucess fetching the data", response.data);
    } catch (error) {
      console.error("Error fetching persons data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    fetchPersons();
    return () => {
      // Cleanup function to remove markers when component unmounts
      setPersons([]); // Clear persons state
    };
  }, []);

  const markers = [
    {
      position: [19.984701088274022, 42.64470151140049], // besha1
      popup: "Riyadh",
      data: "لم يتم المعالجة",
      name: "الحج محمد شيبوب",
      contactNumbers: "011223423432",
      executingEntity: "جمعية رجال من اجل النساء",
      requestType: "مقبولة",
    },
    {
      position: [20.006824179975645, 42.60595448715381], // Jeddah
      popup: "Jeddah",
      data: "تم المعالجة",
      name: "الحج عبدالله شيبوب",
      contactNumbers: "011223423432",
      executingEntity: "جمعية عايشين بكرم الله ",
      requestType: "جيدة",
    },
    {
      position: [19.99674858831157, 42.60153434796344], // Dammam
      popup: "Dammam",
      data: "جاري المعالجة",
      name: "الحج علي شيبوب",
      contactNumbers: "011223423432",
      executingEntity: "جمعية كلنا اخوة",
      requestType: "جامد طحن",
    },
  ];

  const getMarkerIcon = (data) => {
    if (data === "لم يتم المعالجة") {
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "تم المعالجة") {
      return new Icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "جاري المعالجة") {
      return new Icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Red") {
      console.log("It Match the Red icon");
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Green") {
      console.log("It Match the Green icon");
      return new Icon({
        iconUrl: greenIcon,
        iconSize: [38, 38],
      });
    } else if (data === "Orange") {
      console.log("It Match the Orange icon");
      return new Icon({
        iconUrl: OrangeIcon,
        iconSize: [38, 38],
      });
    } else {
      console.log("Nothing Match the icons");
      return new Icon({
        iconUrl: redIcon,
        iconSize: [38, 38],
      });
    }
  };

  const { role, token, email, displayName } = useSelector(
    (state) => state.auth
  ); // Access user role from Redux state
  // console.log(
  //   `User info: Role is ${role}, Token is ${token}, Email is ${email}, DisplayName is ${displayName}`
  // );

  const LocationFinderDummy = () => {
    const map = useMapEvents({
      click(e) {
        console.log(e.latlng);
      },
    });
    return null;
  };
  useEffect(() => {
    console.log("persons", persons);
  }, [persons]);

  return (
    <div className="w-full bg-[#ceb99c] h-[100vh] p-0 m-0 ">
      <Navheader />
      <h1 className="text-4xl font-bold text-center mt-4">جميع الحالات</h1>
      <div className="w-[90%] h-[70vh] mx-auto  border-2 border-blue-500">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "520px", zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />{" "}
          <TileLayer
            attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          {persons &&
            persons.map((person, index) => (
              <Marker
                key={index}
                position={[person.latitude, person.longitude]}
                icon={getMarkerIcon(person.color)}
              >
                <Popup>
                  <div>
                    <h4>الاسم: {person.name || "N/A"}</h4>{" "}
                    {/* Handle case where name is undefined */}
                    <h4>
                      الجهة المنفذة: {person.executingEntity || "N/A"}
                    </h4>{" "}
                    {/* Handle case where executingEntity is undefined */}
                    <h4>نوع الحالة: {person.requestType || "N/A"}</h4>{" "}
                    {/* Handle case where requestType is undefined */}
                    <h4>رقم الاتصال: {person.contactNumbers || "N/A"}</h4>{" "}
                    <h4 className="text-blue-500 text-center cursor-pointer">
                      تعديل هذه الحالة
                    </h4>{" "}
                    <h4 className="text-red-500 text-center cursor-pointer">
                      مسح هذه الحالة
                    </h4>{" "}
                    {/* Handle case where contactNumbers is undefined */}
                  </div>
                </Popup>
              </Marker>
            ))}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
              icon={getMarkerIcon(marker.data)}
            >
              <Popup>
                <div>
                  <h4>الاسم: {marker.name || "N/A"}</h4>{" "}
                  {/* Handle case where name is undefined */}
                  <h4>الجهة المنفذة: {marker.executingEntity || "N/A"}</h4>{" "}
                  {/* Handle case where executingEntity is undefined */}
                  <h4>نوع الحالة: {marker.requestType || "N/A"}</h4>{" "}
                  {/* Handle case where requestType is undefined */}
                  <h4>رقم الاتصال: {marker.contactNumbers || "N/A"}</h4>{" "}
                  <h4 className="text-blue-500 text-center cursor-pointer">
                    تعديل هذه الحالة
                  </h4>{" "}
                  <h4 className="text-red-500 text-center cursor-pointer">
                    مسح هذه الحالة
                  </h4>{" "}
                  {/* Handle case where contactNumbers is undefined */}
                </div>
              </Popup>
            </Marker>
          ))}
          {/* <LocationFinderDummy /> */}
        </MapContainer>
      </div>
    </div>
  );
};

export default Home;
