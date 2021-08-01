import React, { useState } from "react";

import type { Action } from "./types";
import { ActionType } from "./types";

import { ReactComponent as AddIcon } from "./assets/add.svg";
import { ReactComponent as CheckIcon } from "./assets/check.svg";
import { ReactComponent as CloseIcon } from "./assets/close.svg";

type NewPageFormProps = {
  dispatch: (action: Action) => void;
};

export const NewPageForm = ({ dispatch }: NewPageFormProps) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [group, setGroup] = useState("");

  return (
    <>
      <div className="new-page-button">
        <div className="tooltip">
          <button
            onClick={() => setVisible(true)}
            type="button"
            className={visible ? "selected" : ""}
          >
            <AddIcon fill="#669f18" />
          </button>
          <label>Add link</label>
        </div>
      </div>

      {visible && (
        <div className="dialog-wrapper">
          <form className="dialog-form">
            <h4>Add link</h4>
            <label htmlFor="page-url">URL</label>
            <input
              type="text"
              id="page-url"
              defaultValue="http://"
              autoFocus
              onChange={event => setUrl(event.target.value)}
            />
            <br />

            <label htmlFor="page-title">Title</label>
            <input
              type="text"
              id="page-title"
              onChange={event => setTitle(event.target.value)}
            />
            <br />

            <label htmlFor="page-group">Group</label>
            <input
              type="text"
              id="page-group"
              onChange={event => setGroup(event.target.value.toLowerCase())}
            />
            <br />
            <div className="actions">
              <button
                onClick={() => {
                  dispatch({
                    type: ActionType.Add,
                    page: {
                      title,
                      url,
                      group,
                    },
                  });
                }}
                type="button"
              >
                <CheckIcon fill="#669f18" />
              </button>

              <button onClick={() => setVisible(false)} type="button">
                <CloseIcon fill="#669f18" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
