import React, { memo } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { removeUnderscoreAndCapitalise } from './common';

interface EventSelectProps {
  id: string;
  className?: string;
  onChange(event: SelectChangeEvent<any>): void;
  value: string;
  values: Readonly<Array<string>>;
  title: string;
  helper?: string;
}

export default memo(function EventSelect({
  id,
  className,
  onChange,
  value,
  values,
  title,
  helper,
}: EventSelectProps) {
  return (
    <FormControl className={className}>
      <InputLabel id={id}>{title}</InputLabel>
      <Select id={id} value={value} onChange={onChange}>
        {values.map(val => (
          <MenuItem key={val} value={val}>
            {removeUnderscoreAndCapitalise(val)}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helper}</FormHelperText>
    </FormControl>
  );
})
