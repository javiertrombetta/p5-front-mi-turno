"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { getUserInfoById, updateUserInfoByDni, deleteUser, assignUserRole } from "@/services/dataUser";
import { Typography, Container, CircularProgress, Box, Button, Avatar, Select, MenuItem, InputLabel } from "@mui/material";
import InputText from "@/commons/InputText";
import { useRouter } from "next/navigation";
import Alert from "@/commons/Alert";
import dayjs from "dayjs";
import { getBranchesByBusiness } from "@/services/dataBranches";
import { getBusinessData } from "@/services/dataBusiness";

const ViewUser = ({ params }) => {
  const { user } = useSelector((state) => state.auth);
  const isSuperUser = user?.role === "super";
  const [showChangeLabel, setShowChangeLabel] = useState(false);
  const [userRow, setUserRow] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    businessId: "",
    branchId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [business, setBusiness] = useState([]); // -> agregado x fran
  const [branchesByBusiness, setBranchesByBusiness] = useState([]); // -> Agregado x fran
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");

  const fileInputRef = useRef();
  const router = useRouter();

  const [alertInfo, setAlertInfo] = useState({
    open: false,
    type: "info",
    message: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      if (params.dni) {
        try {
          const fetchedUser = await getUserInfoById(params.dni);
          console.log('USUARIO DEL BACK:', fetchedUser);
          setUserRow({ ...fetchedUser, role: fetchedUser.role || "user" });
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError('DNI no está disponible.');
      }
    };

    fetchUser();
  }, [params.dni]);

  const formatLastAccess = (lastLogin) => {
    return lastLogin
      ? dayjs(lastLogin).format("DD/MM/YYYY HH:mm")
      : "No tiene accesos al sistema";
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");
  const avatarUrl =
    userRow?.photo ||
    `https://via.placeholder.com/300?text=${getInitials(
      userRow?.fullName || ""
    )}`;

  const handleBackToList = () => {
    router.push("/users");
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Updating field", name, "to", value);
    setUserRow((prevUserRow) => ({
      ...prevUserRow,
      [name]: value !== undefined ? value : "",
    }));
  };

  //para manejar el cambio de rol
  const handleRoleChange = async (selectedRole) => {
    try {
      await assignUserRole(userRow.dni, selectedRole);
      setUserRow((prevUserRow) => ({ ...prevUserRow, role: selectedRole }));
      setAlertInfo({
        open: true,
        type: "success",
        message: "Rol actualizado correctamente.",
      });
    } catch (error) {
      console.error("Error al cambiar el rol:", error);
      setAlertInfo({
        open: true,
        type: "error",
        message: "Error al cambiar el rol del usuario.",
      });
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      setAlertInfo({
        open: true,
        type: "error",
        message: "Por favor, selecciona una foto primero.",
      });
      return;
    }
    const formData = new FormData();
    formData.append("photo", selectedFile);
    try {
      const updatedUser = await updateUserInfoByDni(formData);
      setUserRow(updatedUser);
      setAlertInfo({
        open: true,
        type: "success",
        message: "Foto actualizada correctamente.",
      });
    } catch (error) {
      setAlertInfo({
        open: true,
        type: "error",
        message: "Error al actualizar la foto.",
      });
    }
  };

  const handleDeleteUser = async () => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );
    if (confirm) {
      try {
        await deleteUser(userRow.dni);
        setAlertInfo({
          open: true,
          type: "success",
          message: "Usuario eliminado con éxito.",
        });
        router.push("/users");
      } catch (error) {
        setAlertInfo({
          open: true,
          type: "error",
          message: "Error al eliminar el usuario.",
        });
      }
    }
  };

  //obtener empresas
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const branchesData = await getBusinessData();
        setBusiness(branchesData); // Establece el estado con los datos de las sucursales
      } catch (error) {
        console.error("Error al obtener datos de sucursales:", error);
      }
    };

    fetchBusiness();
  }, []);

  //obtener sucursales, a partir de una empresa
  useEffect(() => {
    const fetchBranchesByBusiness = async () => {
      try {
        if (selectedBusiness) {
          const branchesData = await getBranchesByBusiness(selectedBusiness);
          setBranchesByBusiness(branchesData);
        } else {
          // Manejar el caso donde selectedBusiness es una cadena vacía
          setBranchesByBusiness([]); // o puedes dejar el estado sin cambios o hacer otras acciones necesarias
        }
      } catch (error) {
        console.error("Error al obtener datos de sucursales:", error);
      }
    };

    fetchBranchesByBusiness();
  }, [selectedBusiness]);

  const handleBusinessChange = (event) => {
    const selectedValue = event.target.value;
    console.log('EMPRESA ELEGIDA:', selectedValue);
    setSelectedBusiness(selectedValue);
  };
  const handleBranchChange = (event) => {
    const selectedValue = event.target.value;
    console.log('SUCURSAL ELEGIDA:',selectedValue);
    setSelectedBranch(selectedValue);
  };

  const handleAcceptChanges = async () => {
    if (!userRow.dni) {
      setAlertInfo({
        open: true,
        type: "error",
        message: "DNI no está definido",
      });
      return;
    }
    try {
      const userDataToUpdate = {
        ...userRow,
        businessId: (userRow.role === "oper" || userRow.role === "admin") ? selectedBusiness : userRow.businessId,
        branchId: userRow.role === "oper" ? selectedBranch : userRow.branchId,
      };     
      const updatedUser = await updateUserInfoByDni(userDataToUpdate);
      console.log('USUARIO ACTUALIZADO:', updatedUser);      
      if (updatedUser.data) {
        setUserRow(prevState => ({
          ...prevState,
          ...updatedUser.data,
        })); 
        setSelectedBusiness(updatedUser.data.businessId || selectedBusiness);
        setSelectedBranch(updatedUser.data.branchId || selectedBranch);
        setAlertInfo({
          open: true,
          type: "success",
          message: "Usuario actualizado con éxito.",
        });
      } 
      else {
        throw new Error("No se recibieron datos actualizados del servidor");
      }
    } catch (error) {
      console.error("Error al actualizar la información del usuario:", error);
      setAlertInfo({
        open: true,
        type: "error",
        message: error.message || "Error al actualizar la información.",
      });
    }
  };
  
  
  

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!userRow) {
    return <Typography>No se encontró el usuario.</Typography>;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 10 }}>
        Detalles del Usuario
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box sx={{ flexGrow: 1, pr: 3 }}>
          <InputText
            label="DNI"
            value={userRow.dni}
            disabled={true}
            onChange={handleInputChange}
            name="dni"
          />
          <InputText
            label="Nombre Completo"
            value={userRow.fullName}
            disabled={!isSuperUser}
            onChange={handleInputChange}
            name="fullName"
          />
          <InputText
            label="Email"
            value={userRow.email}
            disabled={!isSuperUser}
            onChange={handleInputChange}
            name="email"
          />
          <InputText
            label="Teléfono"
            value={userRow.phoneNumber}
            disabled={!isSuperUser}
            onChange={handleInputChange}
            name="phoneNumber"
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: 300,
            height: 300,
            "&:hover": { cursor: "pointer" },
          }}
          onMouseOver={() => setShowChangeLabel(true)}
          onMouseOut={() => setShowChangeLabel(false)}
          onClick={() => fileInputRef.current.click()}
        >
          <Avatar src={avatarUrl} sx={{ width: 300, height: 300 }} />
          {showChangeLabel && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                opacity: showChangeLabel ? 1 : 0,
                transition: "opacity 1s ease",
              }}
              onClick={handleUploadPhoto}
            >
              Cambiar foto
            </Box>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </Box>
      </Box>

      <Box>
        <InputLabel id="rolId">Rol</InputLabel>
        {isSuperUser ? (
          <Select
            labelId="rolId"
            value={userRow.role || ""}
            onChange={(e) => handleRoleChange(e.target.value)}
            name="role"
          >
            <MenuItem value="super">Superadministrador</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="oper">Operador</MenuItem>
            <MenuItem value="user">Usuario</MenuItem>
          </Select>
        ) : (
          <InputText label="Rol" value={userRow.role} disabled />
        )}
      </Box>

      {userRow.role === "admin" || userRow.role === "oper" ? (
        <Box sx={{ marginTop: "8px" }}>
          <InputLabel id="businessId">Selecciona una empresa</InputLabel>
          <Select
            labelId="businessId"
            value={selectedBusiness || userRow.businessId}
            onChange={handleBusinessChange}
            name="business"
          >
            <MenuItem value=''>
              <b>Ninguna</b>
            </MenuItem>
            {business.map((business) => (
              <MenuItem key={business.id} value={business.id}>
                {business.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ) : (
        ""
      )}
      {userRow.role === "oper" && (
        <Box sx={{ marginTop: "8px" }}>
          <InputLabel id="branchesId">Selecciona una sucursal</InputLabel>
          <Select
            labelId="branchesId"
            value={selectedBranch || userRow.branchId}
            onChange={handleBranchChange}
            name="branchesByBusiness"
          >
            <MenuItem value=''>
              <b>Ninguna</b>
            </MenuItem>
            {branchesByBusiness.map((branch) => (
              <MenuItem key={branch.id} value={branch.id}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
      )}

      <InputText
        label="Último Acceso"
        value={formatLastAccess(userRow.lastLogin)}
        disabled
      />
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 4 }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleBackToList}
          sx={{ px: 3, py: 1.5, fontSize: "1rem" }}
        >
          Volver al Listado
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDeleteUser}
          sx={{ ml: 2, px: 3, py: 1.5, fontSize: "1rem" }}
        >
          Eliminar
        </Button>
        {isSuperUser && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleAcceptChanges}
            sx={{ ml: 2, px: 3, py: 1.5, fontSize: "1rem" }}
          >
            Aceptar Cambios
          </Button>
        )}
      </Box>
      <Alert
        open={alertInfo.open}
        type={alertInfo.type}
        message={alertInfo.message}
        onClose={() => setAlertInfo({ ...alertInfo, open: false })}
      />
    </Container>
  );
};

export default ViewUser;
