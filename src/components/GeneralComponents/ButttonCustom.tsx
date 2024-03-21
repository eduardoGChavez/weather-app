import React, { FC, useMemo } from 'react';

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { purple, blue } from '@mui/material/colors';


interface colors {
  color: string,
  backgroundColor: string,
  backgroundColorHover: string,
};

interface colorButtonProps {
  colors: colors,
};

const ColorButton = styled(Button)<colorButtonProps> (({ colors }) => ({
  color: colors?.color,
  backgroundColor: colors?.backgroundColor,
  '&:hover': {
    backgroundColor: colors?.backgroundColorHover,
  },
}));

interface buttonCustomProps {
  typeButton: string,
  title: string,
  onClick: () => void
}

const ButttonCustom: FC<buttonCustomProps> = ({ typeButton, title, onClick }) => {
  const colors: any = useMemo(() => {
    let newColors = null;
    if (typeButton === "accept") {
      newColors = {
        color: "#ffffff",
        backgroundColor: "#3a70b7",
        backgroundColorHover: "#0e467e",
      }
    } else if (typeButton === "cancel") {
      newColors = {
        color: "#000000",
        backgroundColor: "#cccccc",
        backgroundColorHover: "#afaeae",
      }
    }
    return newColors;
  }, [typeButton]);

  return (
    <Stack spacing={2} direction="row">
      <ColorButton variant="contained" onClick={onClick} colors={colors}>{title}</ColorButton>
    </Stack>
  );
};

export default ButttonCustom;