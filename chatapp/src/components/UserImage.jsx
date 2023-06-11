import { Box } from "@mui/material";

const UserImage = ({ picture, size = "60px" }) => {
  return (
    <Box height={size} width={size}>
      <img
        src={`http://localhost:5000/assets/${picture}`}
        alt="user"
        width={size}
        height={size}
        style={{ objectFit: "cover", borderRadius: "25%" }}
      />
    </Box>
  );
};

export default UserImage;
