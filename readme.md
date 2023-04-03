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

# redis
REDIS_PASSWORD=password
REDIS_HOST=url

# gateway
GATEWAY_HOST=url
GATEWAY_PORT=port
FRONTEND_HOST=url

# user service
USER_SERVICE_PORT=port
USER_SERVICE_HOST=url

# house service
HOUSE_SERVICE_PORT=port
HOUSE_SERVICE_HOST=url

# secrets and keys
JWT_ACCESS_TOKEN_SECRET=secret-key
JWT_ACCESS_TOKEN_TIME=time
JWT_REFRESH_TOKEN_SECRET=secret-key
JWT_REFRESH_TOKEN_TIME=time
```

### Example
```
# dev environment
NODE_ENV=development

# databases
MONGO_DB_HOST=mongodb://root:abc123@app-db-container:27017/booking-app?directConnection=true&authSource=admin&retryWrites=true
MONGO_DB_PASSWORD=abc123

# redis
REDIS_PASSWORD=abc123
REDIS_HOST=redis://:abc123@auth-db-container:6379

# gateway
GATEWAY_HOST=http://gateway-container:4000
GATEWAY_PORT=4000
FRONTEND_HOST=http://localhost:3000

# user service
USER_SERVICE_PORT=4001
USER_SERVICE_HOST=http://user-service-container:4001

# house service
HOUSE_SERVICE_PORT=4002
HOUSE_SERVICE_HOST=http://house-service-container:4002

# secrets and keys
JWT_ACCESS_TOKEN_SECRET=abc123
JWT_ACCESS_TOKEN_TIME=10s
JWT_REFRESH_TOKEN_SECRET=xyz123
JWT_REFRESH_TOKEN_TIME=30s
```

