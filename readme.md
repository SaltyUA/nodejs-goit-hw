# Node.js GoIT Course's Homework

## #2 Express. Local RestAPI

- Add routes(GET(all and byId), POST, DELETE, PUT).
- Validate body(used Joi).

## #3 MongoDB

- Create and setup MongoDB Atlas.
- Setup MongoDB Compass and using for create new collection.
- Setup Mongoose connection to DB.
- Using mongoose validation now for body.
- Rewrite CRUD-operations to Mongoose-methods.
- Add new method for PATCH "favorite" field.

## #4 Authoritation

- Setup User schemas and models.
- Create authorization routes(register, login, logout, current).
- Creating token with jwt.
- Hashing password for DB with bcrypt.

  ### Extra

- Added pagination for get request.
- Added filter by 'favorite'.
- Patching user subscription.

## Команди

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
