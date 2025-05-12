FROM python:3.13-slim-bullseye
RUN apt-get update && \
    apt install -y --no-install-recommends --no-install-suggests build-essential pkg-config default-libmysqlclient-dev && \
    pip install --no-cache-dir --upgrade pip
WORKDIR /app
COPY ./requirements.txt /app
# do this as a separate step so whole thing does not need to be rebuilt on app changes
RUN pip install --no-cache-dir -r /app/requirements.txt
COPY . /app
EXPOSE 5000
CMD ["python3", "server.py"]
