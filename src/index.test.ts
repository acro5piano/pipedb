import { DB, MemoryAdaptor, types } from '.'
import test from 'ava'

async function fixtureDB() {
  const adaptor = new MemoryAdaptor()

  const db = new DB({
    adaptor,
    schema: {
      users: {
        email: types.string(),
        name: types.string(),
        bio: types.nullable().string(),
      },
      posts: {
        userId: types.string(),
        content: types.string(),
      },
    },
  })

  await db.init()

  return db
}

test('DB', async (t) => {
  t.truthy(DB)
})

test('insert', async (t) => {
  const db = await fixtureDB()

  await db.table('users').insert({
    bio: 'I am a man',
    name: 'Kay',
    email: 'ketsume0211@gmail.com',
  })

  await db.table('users').insert({
    name: 'Shun',
    email: 'yuta@gmail.com',
  })

  const user = await db.table('users').whereNotNull('bio').first()

  t.log(user)

  t.is(user.bio, 'I am a man')
})

test('checks null', async (t) => {
  const db = await fixtureDB()

  await t.throwsAsync(async () => {
    // @ts-expect-error
    await db.table('users').insert({
      email: 'ketsume0211@gmail.com',
    })
  })
})
