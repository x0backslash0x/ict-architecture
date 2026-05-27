FROM python:3.12-slim
WORKDIR /app
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["fastapi", "run", "gateway.py"]
EXPOSE 8000/tcp