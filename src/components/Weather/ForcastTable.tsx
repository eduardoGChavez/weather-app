import React, { FC, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { icon } from "../../utils/validations";

interface data {
  icon: string;
  description: string;
  hour: string;
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind_speed: number;
}

interface forcastTableProps {
  title: string;
  dataTable: data[];
}

const ForcastTable: FC<forcastTableProps> = ({ title, dataTable }) => {
  const [showTable, setShowTable] = useState(false);

  const handleClickMoreDetails = () => {
    setShowTable(!showTable);
  };

  return (
    <Grid container>
      <Grid
        container
        minHeight={50}
        className="cursor-pointer"
        onClick={handleClickMoreDetails}
      >
        <Grid className="pl-1" xs display="flex" justifyContent="left  " alignItems="center">
          <Typography>{title}</Typography>
        </Grid>
        <Grid className="pr-1" xs display="flex" justifyContent="right" alignItems="center">
          {!showTable ? (
            <KeyboardArrowDownIcon />
          ) : (
            <KeyboardArrowUpIcon />
          )}
        </Grid>
      </Grid>

      {showTable && (
        <TableContainer component={Paper} sx={{ borderRadius: '15px' }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Clima</TableCell>
                <TableCell align="center">Hora</TableCell>
                <TableCell align="center">Humedad</TableCell>
                <TableCell align="center">Temperatura media</TableCell>
                <TableCell align="center">Temperatura min.</TableCell>
                <TableCell align="center">Temperatura max.</TableCell>
                <TableCell align="center">Velocidad de viento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataTable.map((row, index) => (
                <TableRow
                  key={`row-${index}-table-${title}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    <Tooltip title={row.description} placement="top">
                      <Avatar
                        src={icon(row.icon)}
                        style={{ backgroundColor: "#3f7bf7" }}
                      />
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">{row.hour}</TableCell>
                  <TableCell align="center">{row.humidity}%</TableCell>
                  <TableCell align="center">{row.temp}°C</TableCell>
                  <TableCell align="center">{row.temp_min}°C</TableCell>
                  <TableCell align="center">{row.temp_max}°C</TableCell>
                  <TableCell align="center">{row.wind_speed} m/s</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default ForcastTable;
