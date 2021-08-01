import React, { useEffect, useReducer, useState } from "react";

import { NewPageForm } from "./NewPageForm";
import { PageItem } from "./PageItem";
import { Settings } from "./Settings";

import "./App.css";

import type { Action, State } from "./types";
import { ActionType } from "./types";

const STORAGE_KEY = "start-page";

async function checkHeartbeatEnabled() {
  let enabled;

  try {
    await fetch("http://localhost:5000/heartbeat-enabled")
      .then(response => response.json())
      .then(json => {
        enabled = json.enabled;
      });
  } catch (error) {
    enabled = false;
  }

  return enabled;
}

function saveState(state: State) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  return state;
}

function loadState() {
  const state = JSON.parse(localStorage?.getItem(STORAGE_KEY) ?? "[]");
  return state;
}

const initialState: State = loadState();

function reducer(state: State, action: Action) {
  switch (action.type) {
    case ActionType.Add:
      return action.page ? saveState([...state, action.page]) : state;

    case ActionType.Delete:
      return saveState(state.filter(page => page.url !== action?.page?.url));

    case ActionType.Import:
      return action.state ? saveState(action.state) : state;

    case ActionType.Reset:
      return saveState([]);

    default:
      throw new Error();
  }
}

const NO_GROUP = "<<no-group>>";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [heartbeatEnabled, setHeartbeatEnabled] = useState(false);
  const [pulseEvery, setPulseEvery] = useState(0);

  let stateGrouped: { [index: string]: State } = {};

  state.forEach(page => {
    if (page.group) {
      stateGrouped[page.group] = [
        ...(stateGrouped[page.group] ? stateGrouped[page.group] : []),
        page,
      ];
    } else {
      stateGrouped[NO_GROUP] = [
        ...(stateGrouped[NO_GROUP] ? stateGrouped[NO_GROUP] : []),
        page,
      ];
    }
  });

  useEffect(() => {
    checkHeartbeatEnabled().then(enabled => {
      setHeartbeatEnabled(enabled as boolean);
    });
  });

  return (
    <div className="App">
      <Settings
        dispatch={dispatch}
        state={state}
        heartbeatEnabled={heartbeatEnabled}
        pulseEvery={pulseEvery}
        setPulseEvery={setPulseEvery}
      />
      <NewPageForm dispatch={dispatch} />
      <ul className="all-pages">
        {Object.keys(stateGrouped).map(group => {
          return (
            <React.Fragment key={group}>
              <li className="group">
                {group !== NO_GROUP && <h5>{group}</h5>}
                <ul className="group-list">
                  {stateGrouped[group].map(page => {
                    return (
                      <PageItem
                        key={page.url}
                        page={page}
                        dispatch={dispatch}
                        heartbeatEnabled={heartbeatEnabled}
                        pulseEvery={pulseEvery}
                      />
                    );
                  })}
                </ul>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
