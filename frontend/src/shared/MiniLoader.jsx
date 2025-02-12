import React from 'react'
import { Box ,CircularProgress} from '@mui/joy'
const MiniLoader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
    <CircularProgress variant="soft" />
  </Box>
  )
}

export default MiniLoader
