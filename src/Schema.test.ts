import { Schema } from './Schema'
import { types } from './types'
import test from 'ava'

test('Schema', (t) => {
  const schema = new Schema({
    users: {
      email: types.string(),
      name: types.string(),
      bio: types.nullable().string(),
    },
    posts: {
      userId: types.string(),
      content: types.string(),
    },
  })

  t.deepEqual(schema.getInitialData(), {
    users: [],
    posts: [],
  })

  t.notThrows(() => {
    schema.validate({
      users: {
        email: 'hoge',
        name: 'hoge',
      },
    })
  })

  t.throws(() => {
    schema.validate({
      // @ts-expect-error
      users: {
        name: 'hoge',
      },
    })
  })
})
