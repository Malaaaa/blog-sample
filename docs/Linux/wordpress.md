# WP command

mysql config

```sql
    CREATE DATABASE wpdb;
    CREATE USER 'wpdbuser'@'localhost' IDENTIFIED BY 'YOURPASSWORD';
    GRANT ALL ON wpdb.* TO 'wpdbuser'@'localhost' WITH GRANT OPTION;
    FLUSH PRIVILEGES;
    EXIT;
```
