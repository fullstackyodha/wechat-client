// Sets up a requests interception in Node.js with the given request handlers.
import { setupServer } from "msw/node";
import { authHandlers } from "./handlers/auth";

export const server = setupServer(...authHandlers);
