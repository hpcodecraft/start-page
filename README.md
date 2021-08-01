# start-page

A website that lists a collection of links.

You can add & delete links and sort them into groups.

The collection is saved in the browser and can be exported & imported.

The project also contains a small node backend which, when run alongside the react app, allows the app to monitor the online status of your collected links. When the backend is detected, a new "Heartbeat" setting will appear which allows you to set the scanning frequency.

Note:

Editing entries is not supported - if you made a typo, delete the link and add it again. If you want to change the order of items, export your colletion, edit the json file to your likings and re-import it again.

## Installation

Clone or download the project and serve the `docs` folder from a webserver.
To run the backend, use `yarn server`.

Alternatively, you can spin both up with docker using the included docker-compose file.

## Development

In the project directory, you can run:

### `yarn start`

Runs both, app & backend in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn client`

Run react app

### `yarn server`

Run node backend

### `yarn build`

Builds the app for production to the `docs` folder.
