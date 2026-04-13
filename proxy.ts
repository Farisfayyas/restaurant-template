import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: Parameters<typeof handleI18nRouting>[0]) {
  return handleI18nRouting(request);
}

export default proxy;

export const config = {
  matcher: [
    // Match all pathnames except static files and API routes
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
