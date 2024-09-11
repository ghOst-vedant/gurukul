const _config = {
  jwtSecret: process.env.JWT_SECRET!,
};

export const config = Object.freeze(_config);
