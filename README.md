## Description

Small fullstack project to try out some Nest.js concepts, examples from the docs, design patters and best practices as well as serving client side static content (for SPA).

For the server side, the project uses [Nest.js](https://nestjs.com/) + [MongoDB](https://www.mongodb.com/) as the database and [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) for the client side.

To work with the data the project implements **Repository Pattern** for study purposes.

The project's [hoppscotch](https://hoppscotch.io/) specification file is located in the `hoppscotch` directory.

**NOTE**: Usually you'd serve the client side using a static file server like [Nginx](https://www.nginx.com/) or [Apache](https://httpd.apache.org/) but for the sake of simplicity, the project serves the client side from NestJS application. But during development, the client side will be served from [Vite](https://vitejs.dev/)'s dev server.

## Project setup

Install both server and client dependencies

```bash
$ pnpm -r i
```

## Scripts

### Development

To work on both server and client sides at the same time run both separately in watch mode:

#### Server (NestJS):

```bash
# server watch mode
$ pnpm run start:dev
```

#### Client (React + TypeScript):

```bash
# client watch mode
$ pnpm --prefix client dev
```

### Build

Sequence of commands to build and run the project for production:

```bash
# build the server
$ pnpm build
# build (copies dist to the server's dist/client folder)
$ pnpm --prefix client build
# run the server
$ pnpm run start:prod

```

### Tests

#### Server (NestJS):

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
