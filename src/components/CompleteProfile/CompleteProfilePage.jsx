import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function CompleteProfilePage() {
    const [defaultData, setDefaultData] = useState({
        fullName: "",
        url: ""
    });
  const [userData, setUserData] = useState({
    fullName: "",
    url: "",
  });
  useEffect(() => {
    getPreviousValues();
  }, [])

  async function getPreviousValues() {
    let idToken = localStorage.getItem("idToken");

    const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDdmLPGX2tgKcChTn_7-xg6w00Cmr8czhE",
        {
            idToken: idToken
        }
    );
    setDefaultData({
        fullName: res.data.users[0].displayName,
        url: res.data.users[0].photoUrl,
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    let idToken = localStorage.getItem("idToken");

    try {
      const res = await axios.post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDdmLPGX2tgKcChTn_7-xg6w00Cmr8czhE",
        {
          idToken: idToken,
          displayName: userData.fullName,
          photoUrl: userData.url,
        }
      );
      toast("Profile Updated😌");
      document.querySelector("form").reset();
    } catch (e) {
      toast(e.response.data.error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form m-auto my-3 w-25 p-3 shadow-lg rounded-3 bg-gradient"
        style={{
          backgroundColor: "#245296",
          color: "white",
          fontWeight: "bold",
        }}
      >
        <div>
          <label className="d-flex justify-content-center">Full Name</label>
          <input 
            name="fullName"
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            required
          />
        </div>

        <div className="mt-2">
          <label className="d-flex justify-content-center">
            Profile Photo URL
          </label>
          <input
            name="url"
            type="url"
            className="form-control"
            onChange={handleChange}
            placeholder="Paste url here"
            required
          />
        </div>

        <div className="d-flex justify-content-center mt-2">
          <input
            type="submit"
            className="btn bg-gradient btn-secondary"
            style={{
              color: "white",
            }}
            value="UPDATE"
          />
        </div>
      </form>
    </div>
  );
}

export default CompleteProfilePage;
