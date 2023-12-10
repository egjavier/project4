import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../Components/FirebaseConfig"
import { useState, useEffect} from "react"
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Layout() {

  const [ isloggedIn, setIsLoggedIn ] = useState(false)

  // Material UI color customization
  const theme = createTheme({
    palette: {
      primary: {
        main: '#00101C',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#297EA6',
        contrastText: '#ffffff'
      },
    },
  });


  useEffect ( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
      } 
    });
  }, [])

  return (
    <div className="relative bg-[url('./Images/background.svg')] bg-no-repeat min-h-screen min-w-screen bg-fixed bg-cover pb-[60px]">
      <ThemeProvider theme={theme}>
        <Navbar isLoggedIn={isloggedIn} />
        <Outlet context={isloggedIn}/>
        <Footer color='secondary' />
      </ThemeProvider> 
    </div>
  )
}

export default Layout