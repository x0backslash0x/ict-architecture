FROM python:3.14
WORKDIR /app
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["fastapi", "run", "gateway.py"]
EXPOSE 8000/tcp