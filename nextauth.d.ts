// Type extensions for NextAuth
// This file customizes NextAuth interfaces to include additional properties,
// such as user roles, in both the session and JWT.

import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    roles?: string[];
  }

  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultUser {
    roles?: string[];
  }
}
