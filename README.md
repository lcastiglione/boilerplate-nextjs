# Boilerplate with Clean Architecture

This boilerplate, as its name implies, uses clean architecture. The logic and the implementations are separated in two sub projects called `core` and `infra` and there is a web UI made with NextJS.



## Prepare

### Installa dependencies (including sub projects) 

```shell
pnpm install
```

### Tests report

```shell
pnpm test:repo
```

This report is located on the path `reports/tests`

### Documentation

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



## Tests

### Core

```shell
npx nx test core
npx nx test:watch core
npx nx test:cov core
```

### Infra

```shell
npx nx test infra
npx nx test:watch infra
npx nx test:cov infra
```