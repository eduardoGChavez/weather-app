import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Input from "../components/GeneralComponents/Input";
import ButttonCustom from "../components/GeneralComponents/ButttonCustom";
import UserTable from "../components/Home/UserTable";
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { redux_setDefaultValues as r_setDefaultValues } from "../redux_toolkit/userList";
import { redux_setUserList as r_setUserList } from "../redux_toolkit/userList";
import { redux_updateUserList as r_updateUserList } from "../redux_toolkit/userList";
import { selectUserList, selectUserSavedInitalState  } from "../redux_toolkit/userList";
import { isEmpty, size } from "../utils/validations";
import { style } from "../utils/generalStyles";
import { defaultUserList } from "../utils/defaultInfo";

interface user {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
};

const Home = () => {
  const [userId, setUserId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [errorName, setErrorName] = useState<string>("");
  const [errorLatitude, seErrortLatitude] = useState<string>("");
  const [errorLongitude, setErrorLongitude] = useState<string>("");

  const [openModal, setOpenModal] = useState<string>(""); // "add" or "edit"
  const userList = useSelector(selectUserList);
  const userSavedInitalState = useSelector(selectUserSavedInitalState);
  const dispatch = useDispatch();
  const redux_setDefaultValues = (data: user[]) => dispatch(r_setDefaultValues(data));
  const redux_setUserList = (data: user) => dispatch(r_setUserList(data));
  const redux_updateUserList = (data: user) => dispatch(r_updateUserList(data));

  const handleClickSaveUser = () => {
    let messageName: string = "";
    let messageLatitude: string = "";
    let messageNameLongitude: string = "";
    if (isEmpty(name)) {
      messageName = "Por favor ingresa un Nombre.";
    }
    if (isEmpty(latitude)) {
      messageLatitude = "Por favor ingresa un Latitud.";
    }
    if (isEmpty(longitude)) {
      messageNameLongitude = "Por favor ingresa una Longitud.";
    }
    if (!isEmpty(messageName) || !isEmpty(messageLatitude) || !isEmpty(messageNameLongitude)) {
      setErrorName(messageName);
      seErrortLatitude(messageLatitude);
      setErrorLongitude(messageNameLongitude);
      return;
    }

    if (openModal === "add") {
      const sizeList = size(userList);
      const newUserId = sizeList === 0 ? sizeList : Number(userList[sizeList - 1].id) + 1
  
      const user: user = {
        id: (newUserId).toString(),
        name,
        latitude,
        longitude,
      };
      redux_setUserList(user);
    } else {
      const user: user = {
        id: userId,
        name,
        latitude,
        longitude,
      };
      redux_updateUserList(user);
    }

    handleCloseModal();
  }

  const handleOpenModal = (typeAction: string, user: user | null) => {
    if (typeAction === "edit" && user !== null) {
      setUserId(user.id);
      setName(user.name);
      setLongitude(user.longitude);
      setLatitude(user.latitude);
    }
    
    setOpenModal(typeAction);
  };

  const handleCloseModal = () => {
    setUserId("");
    setName("");
    setLongitude("");
    setLatitude("");
    setOpenModal("");
  };

  useEffect(() => {
    if (!userSavedInitalState) {
      redux_setDefaultValues(defaultUserList);
    }
  }, []);

  return (
		<div>
      <Modal
        open={!!openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
            {openModal === "edit" ? "Editar" : "Crear"} usuario
          </Typography>
          <Input
            label={"Nombre"}
            value={name}
            setState={setName}
            errorMessage={errorName}
          />
          <Input
            label={"Latitud"}
            value={latitude}
            setState={setLatitude}
            errorMessage={errorLatitude}
          />
          <Input
            label={"Longitud"}
            value={longitude}
            setState={setLongitude}
            errorMessage={errorLongitude}
          />

          <div className="flex justify-content-space-evenly mt-1">
            <ButttonCustom
              typeButton={"accept"}
              title={"Aceptar"}
              onClick={handleClickSaveUser}
            />
            <ButttonCustom
              typeButton={"cancel"}
              title={"Cancelar"}
              onClick={handleCloseModal}
            />
          </div>
        </Box>
      </Modal>

      <UserTable handleOpenModal={handleOpenModal} />
      
      <div className="flex justify-content-end">
        <IconButton style={{cursor: 'pointer', backgroundColor: "#e4e4e4"}} onClick={() => handleOpenModal("add", null)}>
          <PersonAddIcon color="primary" style={{cursor: 'pointer'}} />
        </IconButton>
      </div>
		</div>
	);
};

export default Home;
