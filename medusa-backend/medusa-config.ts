import { 
  loadEnv, 
  defineConfig,
  Modules,
  ContainerRegistrationKeys,
} from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  modules: [
    {
      resolve: "@medusajs/medusa/auth",
      dependencies: [
        Modules.CACHE,
        ContainerRegistrationKeys.LOGGER,
      ],
      options: {
        providers: [
          // Default email/password provider
          {
            resolve: "@medusajs/medusa/auth-emailpass",
            id: "emailpass",
          },
          // other providers...
          // Authentik auth provider
          {
            resolve: "./src/modules/authentik",
            id: "authentik",
            options: {
              authentikDomain: process.env.AUTHENTIK_DOMAIN!,
              clientId: process.env.AUTHENTIK_CLIENT_ID!,
              clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
              redirectUri: process.env.AUTHENTIK_REDIRECT_URI!,
            },
          },
        ],
      },
    },
  ],
})
