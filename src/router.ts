import * as trpcExpress from '@trpc/server/adapters/express'
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { z } from 'zod';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().create();

interface User {
    id: number;
    name: string;
    age: number;
}

const userList: User[] = [
    {
        id: 1,
        name: 'Anna',
        age: 32
    }
];

export const appRouter = t.router({
    getUsers: t.procedure
        .query((req) => {
            return userList;
        }),
    getUserById: t.procedure
        .input(z.number().min(1))
        .query((req) => {
            const { input } = req;
            const user = userList.find((u) => u.id === input);
            return user;
        }),
    createUser: t.procedure
        .input(z.object({ name: z.string().min(3), age: z.number().min(0) }))
        .mutation(((req) => {
            const user: User = {
                id: userList.length + 1,
                name: req.input.name,
                age: req.input.age
            };

            userList.push(user);
            return user;
        })),
    updateUser: t.procedure
        .input(z.object({ id: z.number().min(1), name: z.string().min(5), age: z.number().min(0) }))
        .mutation(((req) => {
            const index = userList.findIndex((u) => u.id === req.input.id);

            if (index < 0) {
                throw new Error(`User with id ${req.input.id} not found.`);
            }

            userList[index] = {
                ...userList[index],
                name: req.input.name,
                age: req.input.age
            };

            return userList[index];
        })),
    deleteUser: t.procedure
        .input(z.object({ id: z.number().min(1) }))
        .mutation(((req) => {
            const index = userList.findIndex((u) => u.id === req.input.id);

            if (index < 0) {
                throw new Error(`User with id ${req.input.id} not found.`);
            }

            delete userList[index];
            return userList[index];
        }))
});

export type AppRouter = typeof appRouter;