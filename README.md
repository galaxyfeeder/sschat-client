# Simple Secure Chat (SSCHAT) - Client side

---

#### **DISCLAIMER: This project has been developed as a way for learning more about ES6 and React. So it can have errors and imperfections.**

---

**Server side code is available at [galaxyfeeder/sschat-server](https://github.com/galaxyfeeder/sschat-server).**

---

This is simple secure chat (SSCHAT). A simple chat system where all the messages are encrypted between the sender and the receiver using the RSA system. If someone catches the messages in a hop or at the server he would not be able to decrypt them with your private key.

## Basic features

- Encrypted messaging
- Saving all the contacts at the server

## Getting started

```bash
npm install
npm start
```

## Auth system
The auth system is based on the same keys that are used to encrypt and decrypt the user messages.
Each user has its own public key that share with the world to be able to be contacted, and then
it has its own private key that is used to decrypt all messages that people send to him. We can
use the public key also for identification and not only for encrypting the messages.

**Key pairs (public, private) are not unique but the odds of a collision are infinitely small.**

### Logging in
![alt text](http://i66.tinypic.com/34qww3k.png "Login screen")

### Creating new account
![alt text](http://i64.tinypic.com/wb2ft4.png "Register screen")
