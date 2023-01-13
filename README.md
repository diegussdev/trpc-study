#  Study of Express + tRPC

# Technologies
- NodeJs
- Express
- Typescript
- tRPC

# How to use
- Clone the repository
- Access the project directory
- Run `npm install`
- Run `npm run dev`

# Endpoints
- [POST] `/trpc/createUser` - Create user (body example: `{"name": "Dave", "age": 25}`)
- [POST] `/trpc/updateUser` - Update user (body example: `{"id": 1}`)
- [POST] `/trpc/deleteUser` - Delete user (body example: `{"id": 1}`)
- [GET] `/trpc/getUsers` - Get all users
- [GET] `/trpc/getUserById?input=:id` - Get user by id