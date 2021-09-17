/* eslint-disable */
 
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import { IoTicketOutline } from "react-icons/io5";
import { BiBoltCircle, BiHome, BiNews } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import HomeIcon from '@material-ui/icons/Home'
import Kyselyt from '../../pages/Kyselyt'
import { Link } from 'react-router-dom';


// Google Analytics
import ReactGA from 'react-ga';







const useStyles = makeStyles({
  root: {
    width: '100vw',
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    fontSize: 25,
    textDecoration: 'none'
  }
});



export default function NavigationBottom() {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
    ReactGA.set({ page: newValue })
    ReactGA.pageview(newValue)
  };



  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="home" component={Link}  to="/home" icon={<BiHome />} />
      <BottomNavigationAction label="Kerää" value="kyselyt" component={Link}  to="/kyselyt" icon={< BiBoltCircle />} />
      <BottomNavigationAction label="Käytä" value="points" component={Link} to="/test" icon={< IoTicketOutline />} />
      <BottomNavigationAction label="Feed" value="news" component={Link} to="/feed" icon={< BiNews />} />
      <BottomNavigationAction label="Lisää" value="more" component={Link}  to="/more" icon={<CgMore />} />
    </BottomNavigation>
  );
}