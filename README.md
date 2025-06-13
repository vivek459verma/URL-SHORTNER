
# URL-SHORTNER 🔗

A simple and efficient URL shortening service to transform long URLs into compact, shareable links.

## 🚀 Features

- Create short URLs with unique IDs
- Redirects to the original URL
- RESTful API
- Click tracking
- MongoDB persistence

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Utilities**: Nanoid

## 📦 Setup Instructions

### Prerequisites

- Node.js v14+
- MongoDB (local or cloud)

### Installation

```bash
git clone https://github.com/vivek459verma/URL-SHORTNER.git
cd URL-SHORTNER
npm install



```
## Environment Variables
Create a .env file in the root directory with the following:
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:3000
```
## Run the App
```bash
npm start
```
## 🔗 API Endpoints

| Method | Route         | Description                  |
|--------|---------------|------------------------------|
| POST   | /api/shorten  | Shortens a given long URL    |
| GET    | /:shortId     | Redirects to original URL    |


## 📄 License
This project is licensed under the MIT License.
```bash
Let me know if you'd like to include a project logo, deployment instructions, or a live demo link! 🚀✨
```
