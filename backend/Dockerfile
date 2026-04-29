# Alliances PRO marketing backend — Laravel 13 + Filament 5
#
# Run: docker-compose up -d backend
# Bootstrap (first time): see backend/README.md

FROM php:8.3-fpm-alpine

# ---- System deps ----------------------------------------------------------
RUN apk add --no-cache \
        bash \
        git \
        curl \
        zip \
        unzip \
        icu-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libxml2-dev \
        libzip-dev \
        oniguruma-dev \
        autoconf \
        g++ \
        make \
        linux-headers \
        mysql-client \
        nodejs \
        npm

# ---- PHP extensions -------------------------------------------------------
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        intl \
        pdo \
        pdo_mysql \
        bcmath \
        opcache \
        zip \
        exif \
        pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis

# ---- Composer -------------------------------------------------------------
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- App setup ------------------------------------------------------------
WORKDIR /var/www/html

# Use the host UID so file writes from the container don't break host perms.
ARG UID=1000
ARG GID=1000
RUN addgroup -g $GID -S app && adduser -u $UID -S app -G app

# Permission helpers
RUN mkdir -p storage bootstrap/cache && \
    chown -R app:app /var/www/html

USER app

EXPOSE 9000
CMD ["php-fpm"]
