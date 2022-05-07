module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'bb8daf51abe3247fd0e7fac15ecfa8fc'),
    },
  },
  app: {
		keys: ['Klangserver key','32fds32432fdr32432'], 
  },
});
