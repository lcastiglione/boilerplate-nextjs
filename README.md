# Boilerplate with Clean Architecture

This boilerplate, as its name implies, uses clean architecture. The logic and the implementations are separated in two sub projects called `core` and `infra` and there is a web UI made with NextJS.



## Prepare

### Install dependencies (including sub projects) 

```shell
pnpm install
```



## Tests

### Tests report

```shell
pnpm test
```

This report is located on the path `reports/tests`

### Test Core

```shell
pnpm test:core
pnpm test:core:cov
pnpm test:core:watch
```

- Unit test
- Unit test with coverage (This report is located on the path `reports/coverage`)
- Unit tests are watched



### Test Infraestructure

```shell
pnpm test:infra
pnpm test:infra:cov
pnpm test:infra:watch
```

- Unit test
- Unit test with coverage (This report is located on the path `reports/coverage`)
- Unit tests are watched



## Documentation

### Core and Infra code documentation

```shell
pnpm code:doc
```

This documentation is located on the path `reports/docs/` (There is only the 'core' and 'infrastructure' documentation).



## Development

### Web NextJS

```shell
npx nx dev nextjs
```



## Deploy

### Web NextJS

```shell
npx nx build nextjs
npx nx start nextjs
```


