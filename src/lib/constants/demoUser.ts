// The app has no authentication. There is a single local, in-browser profile
// used only to personalise greetings — it is never sent anywhere or persisted
// server-side.
export interface AppUser {
  name: string
}

export const DEMO_USER: AppUser = {
  name: 'SehatKosh User',
}
