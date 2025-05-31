## Description

API developed with NestJs responsible for managing the registration and use of cars and their drivers.

## Project setup without Docker

The project uses **NodeJs v23**. To install it, visit https://nodejs.org/en/download

You can setup the project using **pnpm v10**

## Install pnpm

```bash
$ npm install -g pnpm@latest-10
```

### Install Dependencies

```bash
$ pnpm install
```

### Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Project setup with Docker (and Docker Compose)

### Build the project

```bash
$ docker compose build
```

### Run the project

```bash
$ docker compose up
```

## Run tests

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), NestJS's official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.
