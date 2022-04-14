# Install LAMP Stack Server on WSL (Windows 10)

If you are looking for development locally. I recommend you use Docker instead.

1. Update System

   ```bash
   sudo apt-get update && sudo apt-get upgrade
   ```

2. Download AMP

   ```bash
   sudo apt-get install lamp-server^

   ```

3. Config Apache

   ```bash
   # -e enables the terminal to recognize escape sequences.
   echo -e 'Servername localhost\nAcceptFilter http none' | sudo tee -a /etc/apache2/apache2.conf
   # start apache
   sudo /etc/init.d/apache2 start
   ```

   You can test on http://127.0.0.1 or http://localhost

4. Config MySQL

   ```bash
      sudo service mysql start
      sudo mysql
      SELECT user, authentication_string, plugin, host FROM mysql.user;
      ALTER user 'root'@'localhost' identified with mysql_native_password by 'YOURNEWPASSWORD';

      sudo mysql -u root -p # for enter in mysql.
      ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOURNEWPASSWORD'; # change password
   ```

5. Install PHPMyAdmin

   ```bash
   sudo apt-get install php-mbstring phpmyadmin
   ```

6. Setup Apache Hosts File

   ```bash
   cd /etc/apache2/sites-available/
   sudo nano example1.local.conf
   ```

   Add below code and save: Ctrl + O, save and Ctrl + X, exit.

   ```bash
   <VirtualHost *:80>
         ServerAdmin webmaster@localhost
         ServerName example1.local
         ServerAlias *.example1.local

         DocumentRoot /mnt/e/example1.local

         <Directory />
                  Options FollowSymLinks
                  AllowOverride None
         </Directory>

         <Directory /mnt/e/example1.local>
                  Options Indexes FollowSymlinks MultiViews
                  AllowOverride All
   #               Order allow,deny
   #               Allow from all
                  Require all granted
         </Directory>
   </VirtualHost>
   ```

   And run below commands to enable example1.local website:

   ```bash
   sudo a2ensite example1.local.conf
   sudo service apache2 reload
   ```
