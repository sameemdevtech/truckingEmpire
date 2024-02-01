/* eslint-disable react/prop-types */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectItem = ({ value, handleChange, label, menus }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${label}-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-label`}
        id={label}
        value={value}
        label={label}
        onChange={handleChange}
      >
        {menus.map((e, index) => (
          <MenuItem key={index} value={e[0]}>
            {e[1]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectItem;
