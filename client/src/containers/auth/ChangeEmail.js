import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./ChangeEmail.css";

export default function ChangeEmail() {
    const history = useHistory()
    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [codeSent, setCodeSent] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isSendingCode, setIsSendingCode] = useState(false);

    function validateEmailForm() {
        return email.length > 0;
    }

    function validateConfirmForm() {
        return code.length > 0;
    }

    async function handleUpdateSubmit(event) {
        event.preventDefault();
        setIsSendingCode(true);
        try {
              const user = await Auth.currentAuthenticatedUser();
              await Auth.updateUserAttributes(user, { email: email });
              setCodeSent(true);
        } catch (e) {
              alert(e.message);
              setIsSendingCode(false);
        }
    };

    async function handleConfirmSubmit(event) {
        event.preventDefault();
        setIsConfirming(true);
        try {
          await Auth.verifyCurrentUserAttributeSubmit("email", code);
          history.push("/settings");
        } catch (e) {
          alert(e.message);
          setIsConfirming(true);
        }
    };

  function renderUpdateForm() {
    return (
      <form onSubmit={handleUpdateSubmit}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isSendingCode}
          disabled={!validateEmailForm()}
        >
          Confirm
        </LoaderButton>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmSubmit}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
          <HelpBlock>
            Please check your email ({email}) for the confirmation
            code.
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          bsStyle="primary"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
        >
          Confirm
        </LoaderButton>
      </form>
    );
  }

    return (
      <div className="ChangeEmail">
        {!codeSent
          ? renderUpdateForm()
          : renderConfirmationForm()}
      </div>
    );
}