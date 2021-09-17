/* eslint-disable */
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { CgProfile, CgInfo, CgLock } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { BiCookie } from 'react-icons/bi'
import { VscSettings } from 'react-icons/vsc'
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }));
  

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}


export default function More() {
const classes = useStyles();


        return (
            <div >
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders" className='more-list' >
                    <ListItemLink href="/m/profile">
                        <ListItemText primary="Profiili" />
                        <ListItemIcon>
                        <CgProfile />
                    </ListItemIcon>
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="/m/settings">
                        <ListItemText primary="Asetukset" />
                        <ListItemIcon>
                        <VscSettings />
                    </ListItemIcon>
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="/kayttoehdot">
                        <ListItemText primary="Käyttöehdot" />
                        <ListItemIcon>
                        <CgInfo />
                    </ListItemIcon>
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="/tietosuojalauseke">
                        <ListItemText primary="Tietosuoja" />
                        <ListItemIcon>
                        <CgLock />
                    </ListItemIcon>
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="/evasteet">
                        <ListItemText primary="Evästeet" />
                        <ListItemIcon>
                        <BiCookie />
                    </ListItemIcon>
                    </ListItemLink>
                    <Divider />
                    <ListItemLink href="/api/logout">
                        <ListItemText primary="Kirjaudu ulos" />
                        <ListItemIcon>
                        <FiLogOut />
                    </ListItemIcon>
                    </ListItemLink>
                </List>
            </div >
            </div>
        );
}


