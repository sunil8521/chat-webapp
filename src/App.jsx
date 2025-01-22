
import { useContext } from "react";
import {useGlobalVar} from "./context/ContextUse"
import Box from '@mui/joy/Box';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MyMessages from '../components/MyMessages';
function App() {
  const {count,setCount}=useGlobalVar()
 

  return (
    <>
       <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Sidebar />
        <Header />
        <Box component="main" className="MainContent" sx={{ flex: 1 }}>
          <MyMessages />
        </Box>
      </Box>
    
    </>
  );
}

export default App;
