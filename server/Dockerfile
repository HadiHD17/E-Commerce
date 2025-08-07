FROM php:8.3.6-apache

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev libzip-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
    && pecl install redis \
    && docker-php-ext-enable redis

RUN a2enmod rewrite

RUN sed -i 's|DocumentRoot /var/www/html|DocumentRoot /var/www/html/public|g' /etc/apache2/sites-available/000-default.conf


COPY --from=composer:2 /usr/bin/composer /usr/bin/composer


COPY composer.json composer.lock ./

COPY . .

RUN composer install --no-dev --optimize-autoloader --no-interaction --prefer-dist


RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]
