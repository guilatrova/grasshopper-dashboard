FROM python:3.6

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN pip install locustio

EXPOSE 8089 5557 5558

ENTRYPOINT [ "/app/docker-entrypoint" ]
