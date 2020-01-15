FROM node:10-slim

WORKDIR /app
COPY . /app

RUN apt-get update && \
    apt-get install -y \
        python3 \
        python3-pip \
        python3-setuptools \
        groff \
        less \
    && pip3 install --upgrade pip \
    && apt-get clean

RUN pip3 --no-cache-dir install --upgrade awscli

RUN npm install

EXPOSE 3000
CMD [ "node", "index.js" ]
