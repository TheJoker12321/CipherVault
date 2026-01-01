"idan sananes

Hermon

214617979


To run the project, you will need to run app.js

I used MongoDB and also Supabase because I feel more comfortable with Supabase than Docker.

endpoints:

POST /api/auth/register

User registration: you need to include in the request body username and password ({ "username": "dana", "password": "1234" }) for example, and you will receive the id and username as a response.

POST /api/messages/encrypt

Message encryption: You include in the request body a message and the type of encryption you want ({ "message": "attack at dawn", "cipherType": "reverse" }) for example , and you receive back the message ID, the type of encryption you chose, and the encrypted message.

POST /api/messages/decrypt

Decryption return: You include in the body of the request the ID of the encrypted message, and if the encryption type is not reversible, you will receive a message stating that the original message cannot be retrieved. However, if the type is 'reverse' or 'Etbash', you will receive in the response the ID and the original message.

GET /api/users/me

You get your profile by your username in the headers. You will also get the username and how many encrypted messages are under your name. Example of a response: { "username": "dana", "encryptedMessagesCount": 3 }

