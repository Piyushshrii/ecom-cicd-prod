FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system deps
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Ensure STATIC_ROOT and MEDIA_ROOT exist
RUN mkdir -p /app/staticfiles /app/media

# Run collectstatic at build time
RUN python manage.py collectstatic --noinput

# Build args from Jenkins
ARG SECRET_KEY
ARG DATABASE_URL
ARG STRIPE_SECRET_KEY
ARG ALLOWED_HOSTS
ARG CORS_ALLOWED_ORIGINS

ENV SECRET_KEY=$SECRET_KEY
ENV DATABASE_URL=$DATABASE_URL
ENV STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY
ENV ALLOWED_HOSTS=$ALLOWED_HOSTS
ENV CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS

# Only run migrations + gunicorn at runtime
CMD python manage.py migrate --noinput && \
    gunicorn djackets_django.wsgi:application --bind 0.0.0.0:8000
