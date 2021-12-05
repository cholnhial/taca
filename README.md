# TACA (Tone Aware Chat App)

TACA is a demo application that aims to demonstrate Spring Websockets and IBM Watson Tone Analyzer. It allows two users to communicate via websockets. The chat experience is enhance by IBM Tone Analyzer by conveying what the other user feels like or what the room atmosphere is like.

**DEMO**: https://taca-app.herokuapp.com/

## Messaging

When a user types their message the application sends an API request to Spring Boot to get the tone of the message being typed through IBM Watson.
This is to "help" the user type the correct response, or for them to be more sensitive about the response.

This does not imply that the response is based on counteracting the other user's mood/feeling. It's solely a tone of the message being typed.
It can either be angry, sad, joyful, disgusted,fearful and unknown.

### How the other user feels

The application shows how the other user might be feeling based on what they last sent.
This changes as a new message comes in from them.

## Background image changes periodically

Every 30 seconds the background will change to reflect the mood of the room. The images come from Unsplash API and are based on the overall room tone for the last 10 messages.


## Developing

You can fork this and add other cool features to it extend it etc.
Just kindly please use your own API keys for IBM Watson and Unsplash.
The API keys I'm using are free tier but might not work in the future.

This application is a monolith. You'll find the React app in `src/frontend`.
Vite is used underneath and `pom.xml` has everything needed to build React and put our static resources in webroot for Spring Boot to find.

### Build jar
```
mvn clean package
```

```
java -jar target/taca-0.0.1-SNAPSHOT.jar
```

It should be available at http://localhost:8080/


