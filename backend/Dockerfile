FROM php:8.0-apache

# Instalar dependências
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Instalar extensões PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Habilitar o mod_rewrite para o Apache
RUN a2enmod rewrite

# Configurar diretório de trabalho
WORKDIR /var/www/html

# Configurar Apache para usar o .htaccess
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/htaccess.conf \
    && a2enconf htaccess

# Configurar PHP para usar UTF-8
RUN echo "default_charset = UTF-8" >> /usr/local/etc/php/php.ini-production \
    && echo "default_charset = UTF-8" >> /usr/local/etc/php/php.ini-development \
    && cp /usr/local/etc/php/php.ini-development /usr/local/etc/php/php.ini

# Configurar permissões
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expor porta 80
EXPOSE 80