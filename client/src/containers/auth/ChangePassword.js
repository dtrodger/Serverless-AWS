import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./ChangePassword.css";

export default function ChangePassword() {
    const history = useHistory()
    const [password, setPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");

  function validateForm() {
    return (
      oldPassword.length > 0 &&
      password.length > 0 &&
      password === confirmPassword
    );
  }

  async function handleSubmit(event) {
      event.preventDefault();
      setIsLoading(true);
      try {
          const currentUser = await Auth.currentAuthenticatedUser();
          await Auth.changePassword(
            currentUser,
            oldPassword,
            password
          );
          alert("changed password");
          history.push("/settings");
        } catch (e) {
          alert(e.message);
          setIsLoading(false);
        }
    }

    return (
      <div className="ChangePassword">
        <form onSubmit={handleSubmit}>
          <FormGroup bsSize="large" controlId="oldPassword">
            <ControlLabel>Old Password</ControlLabel>
            <FormControl
              type="password"
              onChange={e => setOldPassword(e.target.value)}
              value={oldPassword}
            />
          </FormGroup>
          <hr />
          <FormGroup bsSize="large" controlId="password">
            <ControlLabel>New Password</ControlLabel>
            <FormControl
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup bsSize="large" controlId="confirmPassword">
            <ControlLabel>Confirm Password</ControlLabel>
            <FormControl
              type="password"
              onChange={e => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </FormGroup>
          <LoaderButton
              block
              type="submit"
              bsSize="large"
              bsStyle="primary"
              disabled={!validateForm()}
              isLoading={isLoading}
            >
          Confirm
        </LoaderButton>
        </form>
      </div>
    );
  }