import { useContext } from 'react'
import AuthContext from '../auth'
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AuthErrorModal() {
    const { auth } = useContext(AuthContext);
    let errorMessage = "";
    if (auth.errorMessage) {
        errorMessage=auth.errorMessage
    }
    function handleCloseModal(event) {
        auth.closeErrorModal();
    }

    return (
        <Modal
            open={auth.errorMessage !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <Typography  className="dialog-header" variant="h6" component="h2">
                    <Alert severity="error">{errorMessage}</Alert>
                </Typography>
                <div id="confirm-cancel-container">
                    <Button variant="text"
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Close</Button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}