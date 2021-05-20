import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import { IoMdListBox } from "react-icons/io";
import { BiBoltCircle, BiHome } from "react-icons/bi";
import { CgMore } from "react-icons/cg";
import HomeIcon from '@material-ui/icons/Home'
import Kyselyt from '../../pages/Kyselyt'
import { Link } from 'react-router-dom';

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
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="home" component={Link}  to="/home" icon={<BiHome />} />
      <BottomNavigationAction label="Kyselyt" value="kyselyt" component={Link}  to="/kyselyt" icon={<IoMdListBox />} />
      <BottomNavigationAction label="Pisteet" value="points" component={Link} to="/test" icon={< BiBoltCircle />} />
      <BottomNavigationAction label="Lisää" value="more" component={Link}  to="/more" icon={<CgMore />} />
    </BottomNavigation>
  );
}