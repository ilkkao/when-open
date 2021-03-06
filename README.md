# Simple opening hours app

> Live demo: [https://when-open.ilkka.xyz/](https://when-open.ilkka.xyz/)

[![Build Status](https://travis-ci.org/ilkkao/when-open.svg?branch=master)](https://travis-ci.org/ilkkao/when-open)

The app reads restaurant opening hours from the data files stored in the `/data` directory.

Supports the file format described in the [schema](https://github.com/ilkkao/when-open/blob/master/server/schema.json) file. The backend internally converts the data files to a format that is straightforward to render on the frontend side.

## Development setup

You need Node.js and yarn

1. Clone the repo

   ```
   $ git clone https://github.com/ilkkao/when-open.git
   $ cd when-open
   ```

2. Install dependencies

   ```
   $ yarn
   ```

3. Start webpack

   ```
   $ yarn run dev
   ```

4. Start the backend server (in the second terminal)

   ```
   $ yarn run dev-server
   ```

5. Open the app

   ```
   $ open http://localhost:38000
   ```

## Production setup

```
$ docker-compose up --build
```

## Credits

Clock icon by Eagle Eye from the Noun Project

## TODO

- More client tests
- More server API tests
