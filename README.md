# About `package.json`

This file configures a **RESTful API** project for contact management using Node.js. Below is a breakdown:

---

## **Project Info**
- **`name`**: `restful-api-nodejs` - The project name.
- **`version`**: `1.0.0` - Initial version.
- **`description`**: API for contact management.
- **`main`**: `src/main.js` - Entry point.
- **`author`**: `Raihan Nooriman` - Author.
- **`license`**: `ISC` - ISC license.
- **`type`**: `module` - Uses ES Modules.

---

## **Dependencies**
Libraries needed for runtime:
- **`@prisma/client`**: Prisma ORM for database.
- **`bcrypt`**: Password hashing.
- **`express`**: Web framework.
- **`joi`**: Input validation.
- **`uuid`**: Generate unique IDs.
- **`winston`**: Logging.

---

## **DevDependencies**
Libraries for development:
- **`@babel/preset-env`**: Babel preset for modern JS.
- **`@types/*`**: Type definitions for TypeScript.
- **`babel-jest`**: Jest with Babel support.
- **`eslint`**: Linter for consistent code.
- **`jest`**: Test framework.
- **`prisma`**: Prisma CLI for migrations.
- **`supertest`**: HTTP API testing.

---

## **Scripts**
- **`test`**: Run tests with Jest: `jest -i`.

---

## **Jest Config**
- **`transform`**: Use `babel-jest` for `.jsx` and `.tsx`.

---

This setup supports building and testing a robust RESTful API with features like database interaction, input validation, password security, and logging.
