export const PORT = process.env.PORT || 8000;
export const MONGO_CONNECTION_STRING = process.env.MONGODB_CONN || 'mongodb://127.0.0.1:27017/issues-tracker';
export const google = {
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  clientId: process.env.GOOGLE_CLIENT_ID,
  secretKey: process.env.GOOGLE_SECRET_KEY,
};
export const session = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  keys: [process.env.SESSION_KEY],
};
export const clientUrl = process.env.CLIENT_URL;
