import React, { useRef, useState } from "react";
import { useOutsideClick } from "./useOutsideClick";

import { ReactComponent as ResetIcon } from "./assets/delete-forever.svg";
import { ReactComponent as ExportIcon } from "./assets/download.svg";
import { ReactComponent as ImportIcon } from "./assets/upload.svg";
import { ReactComponent as HeartbeatIcon } from "./assets/heart-pulse.svg";
import { ReactComponent as SettingsIcon } from "./assets/cog.svg";

import { Action, ActionType, State } from "./types";
import { ImportForm } from "./ImportForm";

type SettingsProps = {
  dispatch: (action: Action) => void;
  heartbeatEnabled: boolean;
  pulseEvery: number;
  setPulseEvery: React.Dispatch<React.SetStateAction<number>>;
  state: State;
};

export const Settings = ({
  dispatch,
  heartbeatEnabled,
  pulseEvery,
  setPulseEvery,
  state,
}: SettingsProps) => {
  const [visible, setVisible] = useState(false);
  const [heartbeatVisible, setHeartbeatVisible] = useState(false);
  const [importDialogVisible, setImportDialogVisible] = useState(false);

  const settingsRef = useRef(null);

  useOutsideClick(settingsRef, () => {
    setVisible(false);
    setHeartbeatVisible(false);
  });

  return (
    <>
      <div className="settings-wrapper">
        <button
          onClick={() => setVisible(true)}
          className={`settings-button${visible ? " selected" : ""}`}
        >
          <SettingsIcon width={24} fill="#669f18" />
        </button>

        {visible && (
          <div className="settings" ref={settingsRef}>
            {heartbeatEnabled && (
              <div className="settings-heartbeat-wrapper">
                <div
                  className={`tooltip${heartbeatVisible ? " disabled" : ""}`}
                >
                  <button
                    className={`heartbeat-button${
                      heartbeatVisible ? " selected" : ""
                    }`}
                    type="button"
                    onClick={() => {
                      setHeartbeatVisible(true);
                    }}
                  >
                    <HeartbeatIcon width={24} fill="#669f18" />
                  </button>
                  <label>Heartbeat</label>
                </div>

                {heartbeatVisible && (
                  <div className="settings-heartbeat-interval">
                    {[60, 30, 10, 5, 3, 0].map(delta => {
                      return (
                        <button
                          key={delta}
                          className={pulseEvery === delta ? "selected" : ""}
                          onClick={() => {
                            setPulseEvery(delta);
                            setHeartbeatVisible(false);
                          }}
                        >
                          {delta === 0 ? "OFF" : `${delta}s`}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            <div className="tooltip">
              <button
                className="export-button tooltip"
                type="button"
                onClick={() => {
                  const base64Data = btoa(JSON.stringify(state, null, 2));
                  const dataUrl = `data:application/json;base64,${base64Data}`;
                  const downloadLink = document.createElement("a");

                  downloadLink.href = dataUrl;
                  downloadLink.download = "start-page.json";

                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  document.body.removeChild(downloadLink);
                }}
              >
                <ExportIcon width={24} fill="#669f18" />
              </button>
              <label>Export</label>
            </div>

            <div className="tooltip">
              <button
                className={`import-button tooltip${
                  importDialogVisible ? " selected" : ""
                }`}
                type="button"
                onClick={() => {
                  setImportDialogVisible(true);
                }}
              >
                <ImportIcon width={24} fill="#669f18" />
              </button>
              <label>Import</label>
            </div>

            <div className="tooltip">
              <button
                className="reset-button tooltip"
                type="button"
                onClick={() => {
                  if (
                    window.confirm("Do you really want to delete all pages?")
                  ) {
                    dispatch({ type: ActionType.Reset });
                  }
                }}
              >
                <ResetIcon width={24} fill="#669f18" />
              </button>
              <label>Reset</label>
            </div>
          </div>
        )}
      </div>
      {importDialogVisible && (
        <ImportForm
          dispatch={dispatch}
          hide={() => {
            setImportDialogVisible(false);
          }}
        />
      )}
    </>
  );
};
