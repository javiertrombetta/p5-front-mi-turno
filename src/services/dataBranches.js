import axios from "axios";

const API_URL = "http://localhost:3000"; // Asegúrate de que la URL es correcta

export const getBranchesData = async () => {
  try {
    const response = await axios.get(`${API_URL}/ruta-a-tu-api-de-sucursales`, {
      withCredentials: true, // si estás usando cookies
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las sucursales:", error);
    return null;
  }
};

export const dataBranches = [
  {
    id: 1,
    name: "Sucursal 1",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },
  {
    id: 2,
    name: "Sucursal 2",
    email: "sucursal2@example.com",
    phoneNumber: 987654321,
    address: "Dirección 2",
    capacity: 30,
    openingTime: "10:00 AM",
    closingTime: "07:00 PM",
  },
  {
    id: 3,
    name: "Sucursal 3",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },
  {
    id: 4,
    name: "Sucursal 4",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },
  {
    id: 5,
    name: "Sucursal 5",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },
  {
    id: 6,
    name: "Sucursal 6",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },
  {
    id: 7,
    name: "Sucursal 7",
    email: "sucursal1@example.com",
    phoneNumber: 123456789,
    address: "Dirección 1",
    capacity: 50,
    openingTime: "09:00 AM",
    closingTime: "06:00 PM",
  },

  // ...
];
