# Getting Started with Create React App
* Regex for password and username validation
* State and refs (to modify DOM from the components)
* UseEffect and validation
* Verbose Errors for inputs
* Enforced Validation on form submission no hacky hacky from the console no grabby the button keeeeeepping it disabed!
* Semantic HTML
* Axios for requests. is a promise based HTTP client for the web
* Context API
* React Router v6 role-based authorization
* concept of routing management (private, public, catch all)
* Layout and outlet (for placeholding child components)
* Custom useAuth hook
* Manageing history - send user to the intended page after logging in 
* useNavigate for programmatic navigation
* Role based authorization
* Component lifecycle management using useEffect (mount)
* Refresh token and access token stored in state so that js can't reach them
* Session management
* Interceptor for private axios (separation of concerns) attaching JWT and retry reqeusts
* Secure Persistent Logins authentication with JWT without local storage of cookies or session storage (securely)

### Security Issue 1
* Stitch the sign out properly so when user is inactive (forgot to logout) it logs out and their sessions is not accessible by some other user. Solve it by "trust a device check"