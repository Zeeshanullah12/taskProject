## Introduction

This API allows users to register, update their information, and authenticate themselves. It is useful for handling user accounts, including email and password management.

## APIs

### 1. **User Sign-Up**
- **Route**: `POST /v0/user/sign-up`
- **Method**: `POST`
- **Description**: Registers a new user with the provided first name, last name, email, and password.
  
#### Required Request Body:
```json
{
  "first_name": "Zeeshan",
  "last_name": "Ullah",
  "email": "zeeshan@example.com",
  "password": "StrongPassword123"
}


route: POST http://localhost:3001/v0/user/sign-up


PUT http://localhost:3005/v0/user/6806396e237214225225900e
Update User
{
  "first_name": "Zeeeeeeeeeeeeeshan",
  "last_name": "Ullah",
  "email": "zeeshan@example.com"
}



route: POST http://localhost:3005/v0/auth/local/login

{
  "email": "zeeshan@example.com",
  "password": "StrongPassword123"
}

response in json :
{
  "message": "Login successful",
  "token": "JWT_TOKEN_HERE"
}


