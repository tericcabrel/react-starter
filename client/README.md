# React Node Starter
This is the client part built with React and Typescript

## Installation
- Install dependencies
```bash
$ cd client
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

## Translation
You can write text in one language and translate to others languages. A command defined for that
But it use Google translation API so an API key required. You can get it
[here](https://cloud.google.com/translate/docs/quickstart-client-libraries-v3) 
Once you have that, update the .env file by setting your 
project ID to the property **REACT_APP_GCP_API_KEY**
```bash
REACT_APP_GCP_API_KEY='my project id'
```
A JSON file containing your Private key was given to you. Place it somewhere in your client folder
(public/key for example. It's what i use and public/key is exclude from versioning).
When it's done, run this command in the terminal

```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"
```
Replace [PATH] with the file path of the JSON file that contains your service account key. 

Finally run this command to translate the texts
```bash
yarn trans
```
This command will translate only the texts who was not translated yet. To
retranslate all texts, add the flag ***all***
```bash
yarn trans --all
```
Sometimes, you will want to translate a specific keys (You changed the text). It's
possible by doing this
```bash
yarn trans --keys=app.home.title
```
If you have many keys:
```bash
yarn trans --keys=app.home.title,app.header.title,menu.label.profile
```
