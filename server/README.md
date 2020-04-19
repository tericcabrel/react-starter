# React Node Starter
This is the server part built with Node, Express and MongoDB for data storage

## Prerequisites
- Node.js
- MongoDB
- Redis

## Installation
- Install dependencies
```bash
$ cd server
$ yarn
```
- Create the configuration file and update with your local config
```bash
$ cp .env.example .env
$ nano .env
```
- Start Application
```bash
$ yarn start
```
The application will be launched by [Nodemon](https://nodemon.com) so it's will restart automatically when a file changed

## Documentation
[ RESTful API Modeling Language (RAML)](https://raml.org/) is used to design our API documentation
An editor is provide to write our specification after we use a command to generate the documentation
- Launch the Editor
```bash
$ yarn api-designer
```
Open the browser and navigate to http://localhost:4000

- Import API specification <br>
The documentation for the available endpoints have already wrote.
We just have to continue by adding our own. For that, you need to:<br>
1- Zip the content of the folder `public/apidoc`<br>
2- Import the zip in the API designer
3- Add or edit specification

- Generate API Documentation
```bash
$ yarn apidoc
```
Open the browser and navigate to http://localhost:7010/api/documentation

## Internationalization
The API can send response in the based on the language of the client.
For that, you need to set the language in the header of the request
````json
{ "Accept-Header":  "fr"} 
````
API will respond in french. Only french and english are available but it's easy to add another language 

## Test
Mocha and Chai is used to write unit test.
```bash
$ yarn test
```
