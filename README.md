# URide API Documentation

## Endpoint: `/users/register`

### Description
This endpoint is used to register a new user in the system. It validates the input data, hashes the user's password, and stores the user information in the database. Upon successful registration, a JSON Web Token (JWT) is returned for authentication purposes.

---

### HTTP Method
`POST`

---

### URL
`/users/register`

---

### Request Body
The request body must be in JSON format and include the following fields:

| Field               | Type     | Required | Description                                      |
|---------------------|----------|----------|--------------------------------------------------|
| `fullname.firstname`| `String` | Yes      | The first name of the user (minimum 3 characters). |
| `fullname.lastname` | `String` | No       | The last name of the user (minimum 3 characters). |
| `email`             | `String` | Yes      | The email address of the user (must be valid).   |
| `password`          | `String` | Yes      | The password for the user account (minimum 6 characters). |

#### Example Request Body
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
}