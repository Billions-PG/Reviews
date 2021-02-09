FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/appCOPY . /src/app
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start"]