/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/"]

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged user to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/login",
    "/register"
]
/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";
/**
 * The default redirect path after loggin in
 * @type {string}
 * To be changed to dashboard later
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"