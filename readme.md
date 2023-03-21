# Booking App

## Installation (Development Build)

### Perquisites
1. Install git
2. Install NodeJS
3. Install Docker

### Install Dependencies Automatically
1. Set your terminal to Bash
2. Give execute permission to `inp.sh`
```bash
chmod +x inp.sh
```
3. Run the script
```bash
# Do this
./inp.sh

# OR

# This
bash inp.sh
```
### Install Dependencies Manually
1. Go into the frontend directory, run `npm install`
2. Go into the backend directory, run `npm install` inside of every folder

## Running the development build
1. Add a environment file `.env` into the root directory of the project
```bash
touch .env
```
2. Follow the instruction below to configure the environment file
3. Inside of the root directory, run `docker compose up` to start the backend
4. Run `docker compose down` to stop the backend

## Environment File Configuration

### Skeleton Configuration
```
# dev environment
NODE_ENV=development

# databases
MONGO_DB_HOST=db-host-here
MONGO_DB_PASSWORD=db-password-here

# user service
USER_SERVICE_PORT=port-number
USER_SERVICE_HOST=url:port
GATEWAY_HOST=url:port

# secrets and keys
JWT_ACCESS_TOKEN_SECRET=secret-key
JWT_ACCESS_TOKEN_TIME=time
JWT_REFRESH_TOKEN_SECRET=secret-key
JWT_REFRESH_TOKEN_TIME=time
```

### Example
```
# dev enviroment
NODE_ENV=development

# databases
MONGO_DB_HOST=mongodb://root:abc123@app-db-container:27017/booking-app?directConnection=true&authSource=admin&retryWrites=true
MONGO_DB_PASSWORD=abc123

# gateway
GATEWAY_HOST=http://gateway-container:4000
GATEWAY_PORT=4000
FRONTEND_HOST=http://localhost:3000

# user service
USER_SERVICE_PORT=4001
USER_SERVICE_HOST=http://user-service-container:4001

# secrets and keys
JWT_ACCESS_TOKEN_SECRET=4c924c9420169b52d280
JWT_ACCESS_TOKEN_TIME=10s
JWT_REFRESH_TOKEN_SECRET=5b1047644909141d164b
JWT_REFRESH_TOKEN_TIME=30s
```

