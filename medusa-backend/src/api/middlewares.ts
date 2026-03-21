import { authenticate, defineMiddlewares, validateAndTransformBody } from "@medusajs/framework/http"
import { CreateUserSchema } from "./authentik/users/route"
import validateAuthentikProvider from "./middlewares/validate-authentik-provider"

export default defineMiddlewares({
  routes: [
    {
      matcher: "/authentik/users",
      methods: ["POST"],
      middlewares: [
        authenticate("user", "bearer", {
          allowUnregistered: true,
        }),
        validateAndTransformBody(CreateUserSchema),
        validateAuthentikProvider
      ],
    },
  ],
})