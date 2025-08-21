FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
 && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Ensure STATIC_ROOT and MEDIA_ROOT exist
RUN mkdir -p /app/staticfiles /app/media

# Build args from Jenkins
ARG SECRET_KEY
ARG DATABASE_URL
ARG STRIPE_SECRET_KEY
ARG ALLOWED_HOSTS
ARG CORS_ALLOWED_ORIGINS

# Export environment variables
ENV SECRET_KEY=$SECRET_KEY \
    DATABASE_URL=$DATABASE_URL \
    STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY \
    ALLOWED_HOSTS=$ALLOWED_HOSTS \
    CORS_ALLOWED_ORIGINS=$CORS_ALLOWED_ORIGINS

# Run migrations, collect static, and start Gunicorn
CMD python manage.py migrate --noinput && \
    python manage.py collectstatic --noinput && \
    gunicorn djackets_django.wsgi:application --bind 0.0.0.0:8000
