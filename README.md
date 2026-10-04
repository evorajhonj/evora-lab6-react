# Lab 6 Product Management

Jhon Joseph Evora · BSIT 3-F2 · MCC2024-00076

React frontend for the LavaLust Product API. The frontend has login, product list, add, edit, delete, and logout. `App` keeps the state; `Login`, `ProductForm`, and `ProductList` receive data and functions through props. `useEffect` loads products after login.

Frontend: https://evora-lab6-products.onrender.com

API: https://evora-lab6-api.onrender.com/index.php/api

## Run

```powershell
npm install
npm run dev
```

Set `VITE_API_URL` in `.env.local` to your API base URL, including `/index.php/api`. Restart Vite when changing this value. The local test API is `http://127.0.0.1:8006/index.php/api`.

## Deploy to Render

Create a Static Site from this repository. Use build command `npm ci && npm run build` and publish directory `dist`. Set `VITE_API_URL` to the deployed LavaLust API URL. Set the API's `FRONTEND_URL` environment variable to the frontend origin.

The build contains only the API URL. Database credentials and API signing keys belong in the backend environment. The login token is kept in session storage for the current tab. The API validates each request and revokes the session on logout.
