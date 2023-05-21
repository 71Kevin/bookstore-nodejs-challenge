# bookstore-nodejs-challenge

This is a NodeJS application with endpoints that allow managing books in a MongoDB database. The application aims to provide a set of operations that can be performed in a library.

## Configuration

To configure the application, follow the instructions below:

1. Clone the repository.
2. Install the dependencies by running the command **npm install**.
3. Copy the **.env.example** file to **.env** and adjust the variables according to your environment's settings.
4. Create a db named "library" in your MongoDB in cases where you are running local and not docker through docker-compose

## How to run the application

To run the application, execute the command **npm start**.

## Endpoints

### Authentication

All requests require authentication by providing a JWT token obtained through the **POST /login endpoint**. The token must be sent as a Bearer Token in the headers of subsequent requests.

### **GET /ping**

Checks if the application is responding.

**Input parameters**

No input parameters required.

**Returns**

Returns a 'pong' message.

### **POST /login**

Generates a JWT token for use in other endpoints.

**Body**

| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| password  | string | Application password. |

**Returns**

Returns a JWT token.

### **GET /books**

Returns all books.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Input parameters**

No input parameters required.

**Returns**

Returns an array with all books.

### **GET /books/:id/check-availability**

Checks if the book is available.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Input parameters**
Parameter | Type | Description
|-|-|-|
id | string | Book ID.

**Returns**

Returns an message, which indicates if the book is available.

### **GET /books/:id**

Returns a specific book.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Input parameters**
| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | Book ID.    |

**Returns**

Returns an object with the book information.

### **POST /books**

Creates a new book.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Body**
| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| title     | string | Book title.  |
| author    | string | Book author. |

**Returns**

Returns an object with the created book information.

### **PUT /books/:id**

Updates an existing book.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Input parameters**
| Parameter | Type   | Description                                                         |
| --------- | ------ | ------------------------------------------------------------------- |
| id        | string | Book ID.                                                            |


**Body**
| Parameter | Type   | Description  |
| --------- | ------ | ------------ |
| title     | string | Book title.                                                         |
| author    | string | Book author.                                                        |
| borrower  | string | Borrower's name, but **NOT REQUIRED** if just editing title and author. |

**Returns**

Returns an object with the updated book information.

### **DELETE /books/:id**

Deletes a book.

**Authorization**
| Parameter | Type   | Description           |
| --------- | ------ | --------------------- |
| Authorization Bearer Token  | string | JWT token returned from /login. |

**Input parameters**
| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| id        | string | Book ID.    |

**Returns**

Returns an object with the deleted book information.

## Additional Information

- This application has a Dockerfile and docker-compose.yml, run the command **docker-compose up -d** in the project root.
- This application uses .eslintrc.json and .prettierrc.json.
- This application follows the Model-View-Controller (MVC) pattern and uses SOLID practices.
- At the root of this project there is a file called **"softdesign.postman_collection.json"** which is a postman collection with all the application's endpoints.
