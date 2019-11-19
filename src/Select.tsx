import React, { memo } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { removeUnderscoreAndCapitalise } from './common';

interface EventSelectProps {
  id: string;
  className?: string;
  onChange(event: React.ChangeEvent<any>): void;
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
