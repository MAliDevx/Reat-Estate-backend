# Real Estate Backend API

A production-ready backend for a Real Estate website built with Node.js, Express, and MongoDB.

## Features

- **Property CRUD**: Complete CRUD operations for real estate properties
- **Category CRUD**: Manage property categories
- **Contact API**: Handle contact form submissions with email notifications
- **File Uploads**: Multiple image uploads for properties and categories using Multer
- **Input Validation**: Comprehensive validation using express-validator
- **Error Handling**: Centralized error handling middleware
- **Security**: Helmet for security headers, CORS, rate limiting
- **Environment Configuration**: dotenv for environment variables

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Multer** - File upload handling
- **Nodemailer** - Email sending
- **express-validator** - Input validation

## Project Structure

```
├── config/
│   └── database.js          # Database connection
├── controllers/
│   ├── propertyController.js # Property CRUD operations
│   ├── categoryController.js # Category CRUD operations
│   └── contactController.js  # Contact form handling
├── middleware/
│   ├── errorHandler.js      # Centralized error handling
│   ├── upload.js           # Multer configuration
│   └── validation.js       # Input validation rules
├── models/
│   ├── Property.js         # Property schema
│   ├── Category.js         # Category schema
│   └── Contact.js          # Contact schema
├── routes/
│   ├── propertyRoutes.js   # Property API routes
│   ├── categoryRoutes.js   # Category API routes
│   └── contactRoutes.js    # Contact API routes
├── uploads/                # Uploaded files directory
│   ├── properties/         # Property images
│   └── categories/         # Category images
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
├── server.js               # Main application file
└── README.md               # This file
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env` file and update the values:
   ```env
   MONGODB_URI=mongodb://localhost:27017/real-estate
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000

   # Email Configuration
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_SECURE=false
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ADMIN_EMAIL=admin@yourdomain.com
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the application**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Properties

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties (with filtering) |
| GET | `/api/properties/:id` | Get single property |
| POST | `/api/properties` | Create new property |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| DELETE | `/api/properties/:id/images/:imageIndex` | Remove specific image |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/active` | Get active categories |
| GET | `/api/categories/:id` | Get single category |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contact messages |
| GET | `/api/contact/:id` | Get single contact message |
| DELETE | `/api/contact/:id` | Delete contact message |

## Data Models

### Property
```javascript
{
  name: String (required),
  location: String (required),
  price: Number (required),
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  category: String (enum),
  status: String (enum),
  description: String,
  images: [String], // Array of image paths
}
```

### Category
```javascript
{
  name: String (required, unique),
  description: String,
  status: String (enum),
  image: String // Single image path
}
```

### Contact
```javascript
{
  name: String (required),
  email: String (required),
  number: String (required),
  message: String (required)
}
```

## File Upload

- **Properties**: Multiple images (up to 10), max 10MB each
- **Categories**: Single image, max 5MB
- Supported formats: PNG, JPG, WEBP
- Images stored in `/uploads/` directory

## Email Configuration

For contact form emails, configure your SMTP settings in `.env`:

- Use Gmail: Set `EMAIL_HOST=smtp.gmail.com`, `EMAIL_PORT=587`
- Generate App Password: Go to Google Account settings > Security > App passwords
- For other providers: Update EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE accordingly

## Query Parameters

### Properties Filtering
- `category`: Filter by category
- `status`: Filter by status
- `location`: Search in location (case-insensitive)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Categories Filtering
- `status`: Filter by status
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

## Error Handling

The API uses centralized error handling with appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `404`: Not Found
- `500`: Internal Server Error

## Security Features

- Helmet for security headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes per IP)
- Input validation and sanitization
- File upload restrictions

## Development

- Use `npm run dev` for development with nodemon
- Environment variables are loaded from `.env` file
- Error stack traces shown in development mode

## Deployment

1. Set `NODE_ENV=production` in environment
2. Configure production MongoDB URI
3. Set up proper email SMTP configuration
4. Use a process manager like PM2
5. Configure reverse proxy (nginx) for production

## License

ISC