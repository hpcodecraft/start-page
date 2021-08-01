import React, { useState } from "react";

import { ActionType } from "./types";
import type { Action } from "./types";

import { ReactComponent as CheckIcon } from "./assets/check.svg";
import { ReactComponent as CloseIcon } from "./assets/close.svg";

type ImportFormProps = {
  dispatch: (action: Action) => void;
  hide: () => void;
};

export const ImportForm = ({ dispatch, hide }: ImportFormProps) => {
  const [file, setFile] = useState<string | undefined>(undefined);

  return (
    <div className="dialog-wrapper">
      <form className="dialog-form">
        <h4>Import links</h4>
        <label htmlFor="backup-file">Backup</label>
        <input
          accept="application/json"
          type="file"
          id="backup-file"
          onChange={event => {
            const file = event?.target?.files?.[0];
            if (file) {
              const allowed = {
                "application/json": true,
              };

              if (file.type in allowed) {
                const reader = new FileReader();
                reader.onload = (function () {
                  return function (event: any) {
                    const data = event.target.result;
                    setFile(data);
                  };
                })();
                reader.readAsText(file);
              }
            }
          }}
        />
        <br />

        <div className="actions">
          <button
            onClick={() => {
              if (file) {
                const state = JSON.parse(file);
                dispatch({
                  type: ActionType.Import,
                  state,
                });
                hide();
              }
            }}
            type="button"
          >
            <CheckIcon fill="#669f18" />
          </button>

          <button onClick={hide} type="button">
            <CloseIcon fill="#669f18" />
          </button>
        </div>
      </form>
    </div>
  );
};
