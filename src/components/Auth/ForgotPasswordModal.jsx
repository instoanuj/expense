import React, { useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'
// import {BsFillKeyFill} from 'react-icons/bs;'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/AuthSlicer';
import axios from 'axios';
import { toast } from 'react-toastify';

function ForgotPasswordModal() {

    const inputRef = useRef('');

    const showForgotModal = useSelector((state) => state.auth.showForgotModal);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(authActions.hideForgotPasswordModal());
    }

    async function handleSubmit() {
        try {
            const res = await axios.post(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDdmLPGX2tgKcChTn_7-xg6w00Cmr8czhE",
                {requestType: "PASSWORD_RESET", email: inputRef.current.value }
            );
            toast('Link send successfully')
            handleClose()
        }
        catch(e) {
            toast(e.response.data.error.message);
        } 
    };

  return (
    <>
        <Modal show={showForgotModal} onHide={handleClose} className=''>
            <Modal.Header closeButton>
                <Modal.Title>
                    Forgot Password 
                    {/* <BsFillKeyFill style={{color: 'gold'}} /> */}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className='text-center'>
                    <input ref={inputRef} className='form-control' placeholder='Email' />

                    <button onClick={() => handleSubmit()} className='btn mt-3 btn-primary'>SEND A LINK</button>
                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal> 
    </>
  );
}

export default ForgotPasswordModal
