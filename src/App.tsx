import React, { useReducer } from "react";

import { NewPageForm } from "./NewPageForm";
import { Settings } from "./Settings";

import "./App.css";

import type { Action, State } from "./types";
import { ActionType } from "./types";

import { ReactComponent as DeleteIcon } from "./assets/delete.svg";

const STORAGE_KEY = "start-page";

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

  // console.log({ state, stateGrouped });

  return (
    <div className="App">
      <Settings dispatch={dispatch} state={state} />
      <NewPageForm dispatch={dispatch} />
      <ul className="all-pages">
        {Object.keys(stateGrouped).map(group => {
          return (
            <React.Fragment key={group}>
              <li>
                <h5>{group}</h5>
              </li>
              <li>
                <ul className="group-list">
                  {stateGrouped[group].map(page => {
                    const label = page?.title ?? page.url;
                    return (
                      <li key={page.url} className="page">
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
