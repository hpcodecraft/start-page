import React, { useEffect, useState } from "react";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";
import type { Action, Page } from "./types";
import { ActionType } from "./types";

import { PageStatus } from "./PageStatus";

type PageProps = {
  page: Page;
  pulseEvery: number;
  dispatch: (action: Action) => void;
  heartbeatEnabled: boolean;
};

export const PageItem = ({
  dispatch,
  heartbeatEnabled,
  page,
  pulseEvery,
}: PageProps) => {
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState("");
  const [loading, setLoading] = useState(false);
  const label = page?.title ?? page.url;

  useEffect(() => {
    if (heartbeatEnabled && pulseEvery > 0) {
      const heartBeat = () => {
        setLoading(true);
        setStatusText("Loading…");
        try {
          fetch("/heartbeat?page=" + page.url)
            .then(response => response.json())
            .then(json => {
              setStatus(json.status);
              setStatusText(json.status === null ? "DOWN" : json.text);
              setLoading(false);
            });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      heartBeat();
      const interval = window.setInterval(heartBeat, pulseEvery * 1000);

      return () => {
        window.clearInterval(interval);
      };
    }
  }, [heartbeatEnabled, page.url, pulseEvery]);

  return (
    <li key={page.url} className="page">
      {heartbeatEnabled && pulseEvery > 0 && (
        <PageStatus loading={loading} code={status} text={statusText} />
      )}
      <a href={page.url} target="_blank" rel="noreferrer">
        {label}
      </a>
      <button
        className="button-delete"
        onClick={() => {
          if (window.confirm(`Delete page "${label}"?`)) {
            dispatch({
              type: ActionType.Delete,
              page: {
                url: page.url,
              },
            });
          }
        }}
        title={`Delete page ${label}`}
      >
        <DeleteIcon />
      </button>
    </li>
  );
};
