import React, { FC } from "react";

import TextField from '@mui/material/TextField';

import { isEmpty } from "../../utils/validations";

interface inputProps {
  label: string,
  value: string,
  setState: (value: string) => void,
  errorMessage: string,
}

const Input: FC<inputProps> = ({
  label,
  value,
  setState,
  errorMessage,
}) => {
  return (
    <div className="flex">
      <TextField
        size="small"
        label={label}
        variant="outlined"
        value={value}
        onChange={(e) => setState(e.target.value)}
        required
        error={!isEmpty(errorMessage)}
        helperText={errorMessage}
      />
    </div>
  );
};

export default Input;