import React from "react";
import { PageHeader } from "react-bootstrap";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import "./BoxTransfer.css";
import { onError } from "../../libs/error";

const GQL_GET_FILES = gql`
  query {
      client(id: "Y2xpZW50OlQ1bmxNamtW") {
        id
        name
        sources {
          edges {
            node {
              id
              type
              path
              items(first: 10) {
                edges {
                  node {
                    ... on sourceFile {
                      id
                      type
                      metadata
                    }
                    ... on sourceFolder {
                      id
                      type
                      metadata
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
`;

export default function BoxTransfer() {
  const { gqlLoading, gqlError, files } = useQuery(GQL_GET_FILES);
  return (
    <div className="BoxTransfer">
        <PageHeader>Box Transfer</PageHeader>
      </div>
  );
}


