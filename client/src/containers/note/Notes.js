import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { onError } from "../../libs/error";
import "./Notes.css";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      async function onLoad() {
        try {
          const notes = await loadNotes();
          setNotes(notes);
        } catch (e) {
          onError(e);
        }
        setIsLoading(false);
      }

      onLoad();
  }, []);

  async function loadNotes() {
    return await API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
      return [{}].concat(notes).map((note, i) =>
        i !== 0 ? (
          <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
            <ListGroupItem header={note.content.trim().split("\n")[0]}>
              {"Created: " + new Date(note.createdAt).toLocaleString()}
            </ListGroupItem>
          </LinkContainer>
        ) : (
          <LinkContainer key="new" to="/notes/new">
            <ListGroupItem>
              <h4>
                <b>{"\uFF0B"}</b> Create a new note
              </h4>
            </ListGroupItem>
          </LinkContainer>
        )
      );
    }

  return (
    <div className="Notes">
        <PageHeader>Notes</PageHeader>
        <ListGroup>
          {!isLoading && renderNotesList(notes)}
        </ListGroup>
      </div>
  );
}