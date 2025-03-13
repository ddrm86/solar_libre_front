FROM node:22.14 AS build-stage
LABEL authors="david.delrio"

WORKDIR /solar_libre_front
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /solar_libre_front/dist /usr/share/nginx/html
COPY /nginx /etc/nginx/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
