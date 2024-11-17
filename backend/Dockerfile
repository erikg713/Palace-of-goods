# Backend Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

# Set environment variable for Flask environment
ARG FLASK_ENV
ENV FLASK_ENV=$FLASK_ENV

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
