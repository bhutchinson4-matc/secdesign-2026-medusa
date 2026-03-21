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
    redisUrl: process.env.REDIS_URL,
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
              clientId: process.env.AUTHENTIK_CLIENT_ID!,
              clientSecret: process.env.AUTHENTIK_CLIENT_SECRET!,
              redirectUri: process.env.AUTHENTIK_REDIRECT_URI!,
              tokenUri: process.env.AUTHENTIK_TOKEN_URI!,
              authorizeUri: process.env.AUTHENTIK_AUTHORIZE_URI!,
              userinfoUri: process.env.AUTHENTIK_USERINFO_URI!,
            },
          },
        ],
      },
    },
  ],
})
