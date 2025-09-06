# NestJS Farmer Management System

A comprehensive NestJS application with session-based authentication and farmer CRUD operations.

## Features

- **User Authentication**
  - Registration with email, firstName, lastName, address, contact number, language, and password
  - Login with email and password
  - JWT token-based authentication
  - Token verification
  - Profile management

- **Farmer Management**
  - Create new farmer records
  - Read/List all farmers
  - Update farmer information
  - Delete farmer records
  - Search farmers by name, email, or crop type

## Installation Guide

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MySQL Server (v5.7 or higher)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Database Setup

1. **Install MySQL Server** (if not already installed):
   - **Windows**: Download from [MySQL official website](https://dev.mysql.com/downloads/mysql/)
   - **macOS**: `brew install mysql`
   - **Ubuntu/Debian**: `sudo apt-get install mysql-server`

2. **Start MySQL Service**:
   - **Windows**: MySQL should start automatically after installation
   - **macOS**: `brew services start mysql`
   - **Ubuntu/Debian**: `sudo systemctl start mysql`

3. **Create Database**:
   ```sql
   CREATE DATABASE farmer_management;
   ```

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

### Step 4: Verify Database Connection
When you start the application, you should see TypeORM logs indicating successful database connection and table creation.

## API Endpoints

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "address": "123 Main St, City, Country",
  "contactNumber": "+1234567890",
  "language": "English",
  "password": "password123"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "user": { ... },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Verify Token
```http
GET /auth/verify
Authorization: Bearer <your-jwt-token>
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <your-jwt-token>
```

### Farmer CRUD Endpoints

**Note: All farmer endpoints require JWT token in Authorization header**

#### Create Farmer
```http
POST /farmers
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "name": "John Farmer",
  "email": "farmer@example.com",
  "phone": "+1234567890",
  "address": "Farm Address, Rural Area",
  "farmSize": "10 acres",
  "cropType": "Wheat",
  "farmingExperience": 5.5
}
```

#### Get All Farmers
```http
GET /farmers
Authorization: Bearer <your-jwt-token>
```

#### Search Farmers
```http
GET /farmers?search=wheat
Authorization: Bearer <your-jwt-token>
```

#### Get Single Farmer
```http
GET /farmers/1
Authorization: Bearer <your-jwt-token>
```

#### Update Farmer
```http
PATCH /farmers/1
Content-Type: application/json
Authorization: Bearer <your-jwt-token>

{
  "name": "Updated Farmer Name",
  "cropType": "Corn"
}
```

#### Delete Farmer
```http
DELETE /farmers/1
Authorization: Bearer <your-jwt-token>
```

## Usage Examples

### 1. Register a New User
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Farm Road, Rural City",
    "contactNumber": "+1234567890",
    "language": "English",
    "password": "securepassword123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Save the `access_token` from the response for subsequent requests.**

### 3. Create a Farmer (after login)
```bash
curl -X POST http://localhost:3000/farmers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE" \
  -d '{
    "name": "Mike Johnson",
    "email": "mike@farm.com",
    "phone": "+1987654321",
    "address": "456 Rural Road, Countryside",
    "farmSize": "25 acres",
    "cropType": "Corn",
    "farmingExperience": 8
  }'
```

### 4. Get All Farmers
```bash
curl -X GET http://localhost:3000/farmers \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 5. Search Farmers
```bash
curl -X GET "http://localhost:3000/farmers?search=corn" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Development Commands

```bash
# Start development server
npm run start:dev

# Build for production
npm run build

# Start production server
npm run start

# Debug mode
npm run start:debug
```

## Project Structure

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── farmer/
│   ├── dto/
│   │   ├── create-farmer.dto.ts
│   │   └── update-farmer.dto.ts
│   ├── entities/
│   │   └── farmer.entity.ts
│   ├── farmer.controller.ts
│   ├── farmer.module.ts
│   └── farmer.service.ts
├── app.module.ts
└── main.ts
```

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Input validation using class-validator
- Protected routes requiring authentication
- CORS enabled for frontend integration
- Token expiration (24 hours by default)

## Database

The application uses MySQL database. Make sure MySQL server is running and the database exists before starting the application.

### Database Tables

**Users Table:**
- id (Primary Key)
- email (Unique)
- firstName
- lastName
- address
- contactNumber
- language
- password (hashed)
- createdAt
- updatedAt

**Farmers Table:**
- id (Primary Key)
- name
- email
- phone
- address
- farmSize
- cropType
- farmingExperience
- createdAt
- updatedAt

## Notes

- JWT tokens expire after 24 hours
- Change the JWT secret in production
- The application automatically creates database tables on startup
- All farmer endpoints require authentication
- Passwords are automatically hashed before storage
- Make sure MySQL server is running before starting the application
- Update the `.env` file with your actual MySQL credentials
- Include the JWT token in the Authorization header as "Bearer <token>" for protected routes