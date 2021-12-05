# TACA (Tone Aware Chat App)

TACA is a demo application that aims to demonstrate Spring Websockets and IBM Watson Tone Analyzer. It allows two users to communicate via websockets. The chat experience is enhance by IBM Tone Analyzer by conveying what the other user feels like or what the room atmosphere is like.

**DEMO**: https://taca-app.herokuapp.com/

## Joining chat

Messaging between two users happens in a room. Rooms have unique alphanumeric ids that identify them.
It's probably not the best way to secure them. A room has messages which the mood is later extracted from.

To start talking you must find a partner. So when you click join the system is searching for a partner who is not in a chat.
Once found both of you are created a room. Your super secret room id is communicated over HTTPS and then is used to subscribe websocket to.

## Messaging

When a user types their message the application sends an API request to Spring Boot to get the tone of the message being typed through IBM Watson.
This is to "help" the user type the correct response, or for them to be more sensitive about the response.

This does not imply that the response is based on counteracting the other user's mood/feeling. It's solely a tone of the message being typed.
It can either be angry, sad, joyful, disgusted,fearful and unknown.

Messages are sent when you click the send button or press enter. They are sent to the server with websockets.
Honestly it's a bit like voodoo to me but Spring makes it easy and it works.
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


