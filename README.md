# Superhero Database

This is the frontend for the Superhero application.  
The backend is deployed on Render.com with a PostgreSQL database.


1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Create a `.env` file:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```
4. **Start the frontend:**
    ```sh
    npm run dev
    ```
The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown by Vite).

---
## Backend

- The backend and DB is deployed on Render.com
- Uses a PostgreSQL database
- Documentation and setup instructions for the backend are in the https://github.com/hellwind2019/superhero-database
- Images are stored at Firebase Storage
---

## 📝 Assumptions

- The backend API is available at the URL specified in `VITE_API_URL` or defaults to `http://localhost:3000`
- The API provides the following endpoints:
  - `GET /api/superheroes`
  - `POST /api/superheroes`
  - `PUT /api/superheroes/:id`
  - `DELETE /api/superheroes/:id`
  - `GET /api/images/:heroId`
  - `POST /api/images/upload`
  - `POST /api/images`
  - `DELETE /api/images/:id`
