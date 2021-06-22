# stage 1
FROM node:15.7.0-alpine as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM trion/nginx-angular
COPY --from=node /app/dist/dashboard-riverfort /usr/share/nginx/html/
