import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from "../components/Success";
import { updateUser } from "../redux/actions/userActions";

function Profile() {
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      document.title = `${currentUser.name} | GAFSA STORE`;
    } else {
      window.location.href = "/login";
    }
  });
  const loginstate = useSelector((state) => state.loginReducer);
  const currentUser = loginstate.currentUser;
  const dispatch = useDispatch();
  const updateuserstate = useSelector((state) => state.updateReducer);
  const { error, loading, success } = updateuserstate;

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  async function update(e) {
    e.preventDefault();
    if (password !== cpassword) {
      alert("Password does not match");
      return;
    }
    const updatedUser = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(updateUser(currentUser._id, updatedUser));
    setTimeout(() => {
      dispatch(logoutUser());
    }, 1500);
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 p-3" style={{ marginTop: "20px" }}>
          <div className="div">
            <h2 className="text-center m-3">Update your info</h2>
            {success && (
              <Success success="User updated successfully. Please relogin" />
            )}
            {loading ? (
              <Loader />
            ) : (
              <>
                <form onSubmit={update}>
                  <input
                    required
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    required
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    required
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                  />
                  <div className="text-center ml-auto d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-success mt-3 m-auto"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </>
            )}
            {error && <Error error="Could not update" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
