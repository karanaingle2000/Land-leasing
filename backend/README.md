# Land Lease Management System - Backend

A Spring Boot REST API backend for managing land lease operations with MySQL database.

## Features

- **User Management**: Registration, authentication, and user profiles
- **Land Management**: CRUD operations for land listings
- **Payment Tracking**: Payment history and status management
- **JWT Authentication**: Secure API access
- **MySQL Database**: Persistent data storage
- **Docker Support**: Easy deployment with Docker Compose

## Tech Stack

- Java 17
- Spring Boot 3.2.1
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT (JSON Web Tokens)
- Maven
- Docker

## Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+ (or use Docker)
- Docker & Docker Compose (optional)

### Option 1: Run with Docker Compose (Recommended)

1. Clone the repository
2. Navigate to the backend directory
3. Run with Docker Compose:

```bash
docker-compose up -d
```

This will start both MySQL and the Spring Boot application.

### Option 2: Run Locally

1. **Setup MySQL Database**:
```sql
CREATE DATABASE landlease_db;
CREATE USER 'landlease'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON landlease_db.* TO 'landlease'@'localhost';
```

2. **Configure Application**:
Update `src/main/resources/application.yml` with your database credentials.

3. **Build and Run**:
```bash
mvn clean install
mvn spring-boot:run
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate JWT token

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users/search?q={query}` - Search users
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Lands
- `GET /api/lands` - Get all lands
- `GET /api/lands/available` - Get available lands
- `GET /api/lands/{id}` - Get land by ID
- `GET /api/lands/owner/{ownerId}` - Get lands by owner
- `GET /api/lands/search?q={query}` - Search lands
- `POST /api/lands?ownerId={id}` - Create new land
- `PUT /api/lands/{id}` - Update land
- `POST /api/lands/{landId}/lease/{tenantId}` - Lease land to tenant
- `DELETE /api/lands/{id}` - Delete land

### Payments
- `GET /api/payments` - Get all payments
- `GET /api/payments/{id}` - Get payment by ID
- `GET /api/payments/tenant/{tenantId}` - Get payments by tenant
- `GET /api/payments/land/{landId}` - Get payments by land
- `GET /api/payments/owner/{ownerId}` - Get payments by owner
- `GET /api/payments/overdue` - Get overdue payments
- `GET /api/payments/pending` - Get pending payments
- `POST /api/payments?landId={id}&tenantId={id}` - Create payment
- `PUT /api/payments/{id}` - Update payment
- `POST /api/payments/{id}/mark-paid` - Mark payment as paid
- `DELETE /api/payments/{id}` - Delete payment

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 3306 |
| `DB_NAME` | Database name | landlease_db |
| `DB_USERNAME` | Database username | root |
| `DB_PASSWORD` | Database password | password |
| `JWT_SECRET` | JWT signing secret | mySecretKey... |
| `CORS_ORIGINS` | Allowed CORS origins | http://localhost:3000 |

## Database Schema

The application automatically creates the following tables:
- `users` - User information and authentication
- `lands` - Land listings and details
- `payments` - Payment records and tracking

## Security

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration for frontend integration
- Role-based access control

## Deployment

### Production Deployment

1. **Build the application**:
```bash
mvn clean package -DskipTests
```

2. **Create Docker image**:
```bash
docker build -t landlease-backend .
```

3. **Deploy with environment variables**:
```bash
docker run -d \
  -p 8080:8080 \
  -e DB_HOST=your-db-host \
  -e DB_USERNAME=your-db-user \
  -e DB_PASSWORD=your-db-password \
  -e JWT_SECRET=your-jwt-secret \
  landlease-backend
```

### Cloud Deployment

The application is ready for deployment on:
- AWS (EC2, ECS, Elastic Beanstalk)
- Google Cloud Platform
- Azure
- Heroku
- DigitalOcean

## Testing

Run tests with:
```bash
mvn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.