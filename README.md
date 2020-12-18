# typing-db

[experimental] Another in-memory database using Remeda

# Features

⚠ The following **will** be implemented.

- Type-safe: Works nicely with TypeScript
- Extensible: Save data to anywhere with custom adaptors
- Portable: Similar to Knex
- Sensible: Adds `id`, `createdAt`, `updatedAt` by default
- Null-safe: Checks null if configured
- Relational: Supports basic `join`
- Asynchronous: No synchronous API

# Usage

⚠ The following **will** be implemented.

## Basic usage

```typescript
import { FileAdaptor, TypeDB, R, types } from 'typing-db'

const adaptor = new FileAdaptor({
  fileName: 'db.json',
})

const db = new TypeDB({
  adaptor,
  schema: {
    users: {
      email: types.string().unique(),
      name: types.string().defaultTo(''),
      bio: types.string().nullable(),
      birthDate: types.date().nullable(),
    },
    posts: {
      userId: types.string(),
      content: types.string().defaultTo(''),
    },
  },
})

async function run() {
  await db.init()

  await db
    .table('users')
    .insert({ email: 'ketsume0211@gmail.com' })
    .then((user) =>
      db.table('posts').insert({ userId: user.id, content: 'Hello World' }),
    )

  const user = db.table('users').whereNotNull('bio').join('posts').first()

  console.log(user)
}

run()
```

Output:

```typescript
{
  name: '',
  email: 'ketsume0211@gmail.com',
  posts: [
    {
      userId: 'Oa83eVai5',
      content: 'Hello World',
    },
  ],
}
```
