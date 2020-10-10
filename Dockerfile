FROM analytik/nodejs14 as build

WORKDIR /home/app

COPY package.json /home/app/
COPY package-lock.json /home/app/

RUN npm i

COPY . /home/app