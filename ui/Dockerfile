FROM node:12 as base

ARG API_HOST
ENV API_HOST $API_HOST

RUN npm install -g parcel-bundler

COPY . ./app/
WORKDIR /app

RUN npm install
RUN npm run build

# Serve it
FROM nginx

# Copy needed files
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
