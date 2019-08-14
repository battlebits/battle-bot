FROM node:latest

# Create directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install bot
COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

# Start me!
CMD ["node", "index.js"]
