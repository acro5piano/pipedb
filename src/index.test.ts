import { TypeDB, MemoryAdaptor, types } from '.'
import test from 'ava'

test('TypeDB', async (t) => {
  t.truthy(TypeDB)

  const adaptor = new MemoryAdaptor()

  const db = new TypeDB({
    adaptor,
    schema: {
      users: {
        email: types.string,
        name: types.string,
        bio: types.nullable.string,
      },
      posts: {
        userId: types.string,
        content: types.string,
      },
    },
  })

  await db.init()

  await db.table('users').insert({
    bio: 'a',
    email: 'ketsume0211@gmail.com',
    name: 'Kay',
  })

  await db.table('users').insert({
    email: 'yuta@gmail.com',
    name: 'Yuta',
  })

  const user = await db.table('users').whereNotNull('bio').first()

  t.log(user)

  t.is(user.name, 'Kay')
})
