FROM node:18-alpine AS builder

RUN apk add --no-cache python3 g++ make

# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package.json package.json
COPY package-lock.json package-lock.json

# install node modules and build assets
RUN npm install --production

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Create production build of React App
RUN npm run build

# Choose NGINX as our base Docker image
FROM nginx:alpine

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
