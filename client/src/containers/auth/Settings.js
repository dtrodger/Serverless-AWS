import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { PageHeader } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import "./Settings.css";

export default function Settings() {
    return (
      <div className="Settings">
      <PageHeader>Settings</PageHeader>
        <LinkContainer to="/settings/email">
          <LoaderButton
            block
            bsSize="large"
          >
            Change Email
          </LoaderButton>
        </LinkContainer>
        <LinkContainer to="/settings/password">
          <LoaderButton
            block
            bsSize="large"
          >
            Change Password
          </LoaderButton>
        </LinkContainer>
      </div>
    );
}