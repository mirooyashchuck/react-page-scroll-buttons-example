import { Box, Paper, Typography } from "@mui/material";

const SectionBox = ({ idx }) => (
  <Box width="50vw" py={1}>
    <Paper sx={{ height: "40vh", backgroundColor: "whitesmoke" }} elevation={5}>
      <Box
        height={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">section {idx}</Typography>
      </Box>
    </Paper>
  </Box>
);

export default SectionBox;
