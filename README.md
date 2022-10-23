## xau
A [Hacker News](https://news.ycombinator.com/) clone made of the @entria challenge.

### Getting started

1. Install packages
```bash
$ yarn install
```

2. Copy all environment files
```bash
$ yarn copy-env
```

3. Fill environment files
```bash
# packages/server/.env

PORT=
MONGO_URI=
JWT_SECRET=
```

```bash
# packages/web/.env

NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_JWT_SECRET=
```

4. Generate Relay types
```bash
$ yarn relay
```

### Running
#### Running web
```bash
$ yarn dev:web
```

#### Running server
```bash
$ yarn dev:server
```

#### Running web and server together
```bash
$ yarn dev:all
```

### References
- [Relay Workshop](https://github.com/sibelius/relay-workshop)
- [Relay NextJS](https://github.com/wyattjoh/relay-nextjs/tree/main/src/relay)
- [Fakeddit](https://github.com/noghartt/fakeddit)