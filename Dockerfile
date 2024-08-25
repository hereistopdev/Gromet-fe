ARG DOCKER_BASE_IMAGE_REGISTRY=docker.io/library
ARG DOCKER_BASE_IMAGE_REPOSITORY=node
ARG DOCKER_BASE_IMAGE_TAG=14.20-alpine
FROM ${DOCKER_BASE_IMAGE_REGISTRY}/${DOCKER_BASE_IMAGE_REPOSITORY}:${DOCKER_BASE_IMAGE_TAG} as build

WORKDIR /app

COPY . .

RUN npm install

RUN npm install axios@1.2.2 react-color@2.19.3 react-highlight-words@0.18.0 react-query@3.39.2

RUN npm run build

FROM nginx:1.21.6

COPY --from=build /app/build /usr/share/nginx/html/ssp/
