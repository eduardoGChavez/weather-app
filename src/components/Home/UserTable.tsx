import React, { FC, useState, useMemo } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { selectUserList } from "../../redux_toolkit/userList";
import { redux_removeUserList as r_removeUserList } from "../../redux_toolkit/userList";
import { redux_setUserSelected as r_setUserSelected } from "../../redux_toolkit/userSelected";

import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';

import Pagination from '@mui/material/Pagination';
import { isEmpty } from "../../utils/validations";

interface user {
  id: string,
  name: string,
  longitude: string,
  latitude: string,
};

interface userTableProps {
  handleOpenModal: (typeAction: string, user: user) => void
}

const UserTable: FC<userTableProps> = ({ handleOpenModal }) => {
  const ELEMENTS_PER_PAGE = 10;
  const userList = useSelector(selectUserList);
  const dispatch = useDispatch();
  const redux_removeUserList = (data: string) => dispatch(r_removeUserList(data));
  const redux_setUserSelected = (data: user) => dispatch(r_setUserSelected(data));
  const navigate = useNavigate();
  
  const [page, setPage] = useState(1);

  const tableLength = useMemo(() => {
    return userList?.length;
  }, [userList]);

  const handleChangePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewUser = (userSelected: user) => {
    redux_setUserSelected(userSelected);
    navigate("/weather");
  };

  const handleRemoveUser = (id: string) => {
    redux_removeUserList(id);
  };

  return (
    <div>
      
      {/* TODO: Mensaje cuando no hay usuarios registrados y tener 5 usuarios por defecto siempre en el sistema */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Latitud</TableCell>
              <TableCell align="center">Longitud</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList
              ?.slice(
                (page - 1) * ELEMENTS_PER_PAGE,
                (page - 1) * ELEMENTS_PER_PAGE +
                  ELEMENTS_PER_PAGE
              )
              .map((row: user, index: string) => (
              <TableRow
                key={`row-${index}-table-users`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.latitude}</TableCell>
                <TableCell align="center">{row.longitude}</TableCell>
                <TableCell align="center">
                  <Grid>
                    <IconButton style={{cursor: 'pointer'}} onClick={() => handleViewUser(row)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>

                    <IconButton style={{cursor: 'pointer'}} onClick={() => handleOpenModal("edit", row)}>
                      <BorderColorIcon color="primary" />
                    </IconButton>

                    <IconButton style={{cursor: 'pointer'}} onClick={() => handleRemoveUser(row.id)}>
                      <DeleteIcon sx={{ color: pink[500] }} style={{cursor: 'pointer'}} />
                    </IconButton>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {!isEmpty(userList) && (
        <Pagination
          count={Math.ceil(tableLength / ELEMENTS_PER_PAGE)}
          page={page}
          onChange={handleChangePagination}
        />
      )}
    </div>
  );
};


export default UserTable;