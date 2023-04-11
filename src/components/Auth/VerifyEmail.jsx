import axios from 'axios';
import React, { useState } from 'react'

function VerifyEmail() {

    const [isverified, setIsVerified] = useState(true);
    const [text, settext] = useState(
        "Your Email is not verified. Please verify it."
    );

    const verifyEmailId = async () => {
        const res = await axios.post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDdmLPGX2tgKcChTn_7-xg6w00Cmr8czhE",
            {
                requestType: 'VERIFY_EMAIL',
                idToken: localStorage.getItem("idToken"),
            }
        );

        settext("Please check your mailbox and confirm the mail💻...");
        setIsVerified(false);
    }
  return (
    <div className='m-5'>
        <p className='display-3'>{text}</p>
        {isverified && <button onClick={() => verifyEmailId()} className="btn bg-gradient btn-secondary"
            style={{
              color: "white",
            }}>Verify Email</button>}
    </div>
  )
}

export default VerifyEmail
