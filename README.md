
# Live Chat (IMS)

I made this project when I first came to know about websockets.
My aim was to build a IMS like whatsapp, messenger etc.




## Tech Stack

**Client:** React, Typescript, Websockets

**Server:** Quart (Async Flask), SQLite3, Tortoise ORM, Pydantic




## Lessons Learned

I learnt how websockets and ISM work? Biggest challenge I faced was authorization in websockets, I had to read many articles to implement a secure authorization.


**Side Note:** This project was built 2 years ago. And this readme was added later, some features might not work as expected, feel free to fix them :)


## Screenshots

Signup Page (I know it's not pretty, lol)
![App Screenshot](https://i.imgur.com/OQKAkQL.png)

Instant Messaging
![App Screenshot](https://i.imgur.com/j35h5gD.png)

Can make friends
![App Screenshot](https://i.imgur.com/PBeXuKB.png)

Emojis Support
![App Screenshot](https://i.imgur.com/bq5AshO.png)



## Run Locally

Clone the project

```bash
  git clone https://github.com/Wiper-R/Live-Chat
```

**Backend**

Go to the project directory

```bash
  cd backend
```

Install dependencies

```bash
  python -m pip install poetry
```
```bash
  poetry install
```

Start the server

```bash
  python app.py
```


**Frontend**

Change directory
```bash
  cd Frontend
```

Install dependencies
```bash
  npm install
```

Start the server
```bash
  npm start
```




## License

[MIT](https://choosealicense.com/licenses/mit/)

