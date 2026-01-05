import { Box, TextField, IconButton, Paper, Stack } from "@mui/material";
import { FiSearch, FiPlus } from "react-icons/fi";

const EmployeeFilters = ({
  search,
  setSearch,
  gender,
  setGender,
  status,
  setStatus,
}) => {
  return (
    <div style={styles.container}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: 300 }}>
        <FiSearch size={18} />
        <TextField
          variant="standard"
          placeholder="Search employees..."
          fullWidth
          InputProps={{ disableUnderline: true }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "10px",
    margin: "20px 0",
  },
};

export default EmployeeFilters;
