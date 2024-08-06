import { Typography, Box, Container } from "@mui/material";

export default function Explore() {
  return (
    <Container>
      <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h3">Explore</Typography>
      <Box sx={{display: "flex", justifyContent:"space-between", alignItems:"center"}}>
        <Typography sx={{fontWeight: 'bold', color:"white"}} variant="h3">History</Typography>
        <Typography sx={{fontWeight: 'light', color:"white", textDecoration: "underline"}}>See all</Typography>
      </Box>
    </Container>
  )
}