/* eslint-disable */
 
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    buttons: {
        color: 'white'
    },
    actions:{
        marginTop: '50px'
    }
}));

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete =  async () => {
        setOpen(false);
        const confirm = true
        await axios.get('/api/profile/delete', {
            params: {
              confirm
            }
          }).then(
            res => {
                // console.log(res)
            }
        )
       window.location ='/'
    };

    return (
        <div>
            <a onClick={handleClickOpen} className="btn btn-lg btn-block text-uppercase btn-danger">Poista</a>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.root}
                PaperProps={{
                    style: {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                <DialogContent>
                    <Alert variant="filled" severity="error">
                        <AlertTitle><strong>Haluatko varmasti poistaa käyttäjän?</strong></AlertTitle>
                        Jos poistat käyttäjän, et voi enää palata ja menetät kaikki kertyneet kupongit ja bonukset.
                        <strong> Käyttäjätietosi poistuvat lopullisesti eikä niitä voi palauttaa. Menetettyjä etuja ei korvata!</strong>
                        <DialogActions className={classes.actions}>
                            <Button  className={classes.buttons} onClick={handleClose} color="primary">
                                Peruuta
                            </Button>
                            <Button  className={classes.buttons} onClick={handleDelete} color="primary" autoFocus>
                                Hyväksy ja poista
                            </Button>
                        </DialogActions>
                    </Alert>
                </DialogContent>

            </Dialog>
        </div>
    );
}
