# Server Planner

An API service that calculates the server hardware requirements for a data center to host a set of virtual machines.

## API Endpoints


### `GET /ping`
* **Description:** An endpoint to know if the server is still alive or not.
* **Success Response:**
  * **Status Code:** `200` 
  * **Content:**
      ```
      {
        ok: true, 
        message: 'Server is Alive'
      }
      ```
    
* **Error Response:**
  * If the server is not alive, the request won't be successful.

### `POST /plan`
* **Description:** Calculates the server hardware requirement to host a set of virtual machines
* **Request Body:**
    ```
    {
      serverType: {
        CPU: <number>,
        RAM: <number>,
        HDD: <number>,
      },
      virtualMachines: [
        {
          CPU: <number>,
          RAM: <number>,
          HDD: <number>,
        },
        // as many virtual machines as possible
      ]
    }
    ```
* **Success Response:**
  * **Code:** `200 `
  * **Content:**
      ```
      {
        ok: true,
        data: <number> // the number of server required to host the set of VMs
      }
      ```
* **Error Response:**
  * **Status Code:** `400(validation error)`
  * **Content:** 
      ```
      {
        ok: false,
        errors: {
          // Joi validation errors
        }
      }
      ```

## Setting Up

### Running with docker
If you have docker installed, just clone the project and run the following command in the project root directory:
```
docker build -t <image-name> .
```
Where `<image-name>` can be whatever you want to name the docker image. After that successfully completes, run:
```
docker run -p <server-port>:7000 <image-name>
``` 
The `<server-port>` is a number representing whatever port you want the server to be accessible on. You can attach a `-d` to the last command to make the container run in the background.

### Running without docker
For development purpose especially, after cloning the project and you are sure that you have node(version 12) installed, you can go ahead to run:

```
# to install dependencies
npm install

# to start the app in watch mode
npm run dev

# to run a bundled version of the app
npm start
```


## Testing
The app is fully tested. It has both unit and integration test. Test files are located in `<project-root>/src/tests`. Use `npm test` to run the tests. 
