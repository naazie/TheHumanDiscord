FROM node:22

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 5050

CMD ["npm", "run", "dev"]