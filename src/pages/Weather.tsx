import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ButttonCustom from "../components/GeneralComponents/ButttonCustom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import UserInfo from "../components/Weather/UserInfo";
import Forcast from "../components/Weather/Forcast";

import { redux_setUserSelected as r_setUserSelected } from "../redux_toolkit/userSelected";
import { style } from "../utils/generalStyles";
import { isEmpty } from "..//utils/validations";

interface user {
  id: string;
  name: string;
  longitude: string;
  latitude: string;
}

interface dataStore {
  userSelected: user;
}

const Weather = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const userSelected = useSelector((state: dataStore) => state.userSelected);
  const dispatch = useDispatch();
  const redux_setUserSelected = (data: user | null) =>
    dispatch(r_setUserSelected(data));

  const handleClickBackToHome = () => {
    redux_setUserSelected(null);
    navigate("/");
  };

  useEffect(() => {
    if (isEmpty(userSelected)) {
      setOpenModal(true);
    }
  }, []);

  const handleRedirectToHome = () => {
    setOpenModal(false);
    handleClickBackToHome();
  };

  return (
    <div className="main_body__content">
      <Modal
        open={!!openModal}
        onClose={handleRedirectToHome}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Aún no seleccionas un usuario
          </Typography>

          <div className="flex justify-content-center mt-1">
            <ButttonCustom
              typeButton={"accept"}
              title={"Aceptar"}
              onClick={handleClickBackToHome}
            />
          </div>
        </Box>
      </Modal>

      {/* TODO: Soporte para icónos con posición left o right */}
      <Button
        onClick={handleClickBackToHome}
        variant="outlined"
      >
        <ArrowBackIcon />
        Regresar al Inicio
      </Button>

      {isEmpty(userSelected) ? (
        <Typography id="no-user-selected" variant="h6" component="h2" align="center">
          No se ha seleccionado un usuario
        </Typography>
      ) : (<>
        <UserInfo user={userSelected} />
        <Forcast
          latitude={userSelected.latitude}
          longitude={userSelected.longitude}
        />
      </>)}
    </div>
  );
};

export default Weather;
