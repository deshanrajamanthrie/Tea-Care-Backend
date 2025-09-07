4. **Configure Database Connection**:
   Update the `.env` file with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=farmer_management
   ```

### Step 3: Start the Development Server

```bash
npm run start:dev
```

The application will start on `http://localhost:3000`

- JWT tokens expire after 24 hours
- Change the JWT secret in production
- The application automatically creates database tables on startup
- All farmer endpoints require authentication
- Passwords are automatically hashed before storage
- Make sure MySQL server is running before starting the application
- Update the `.env` file with your actual MySQL credentials
- Include the JWT token in the Authorization header as "Bearer <token>" for protected routes
