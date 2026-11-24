

# FROM  node
# WORKDIR /app
# COPY package*json ./
# RUN npm install


# COPY ./gateway/package*json ./gateway/
#  RUN  npm install
#  COPY gateway ./gateway
#  COPY shared ./shared

#  WORKDIR /app/gateway
#  EXPOSE 8000
#  CMD [ "npm","start" ]




FROM node:22

WORKDIR /app

# Install shared backend dependencies
COPY package*.json ./
RUN npm install

# Install gateway dependencies
COPY gateway/package*.json ./gateway/
RUN cd gateway && npm install

# Copy source code
COPY gateway ./gateway
COPY shared ./shared

WORKDIR /app/gateway

EXPOSE 8000

CMD ["npm", "start"]

