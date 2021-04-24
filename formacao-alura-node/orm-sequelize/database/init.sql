create user 'alan'@'%' identified by '12345';
grant all privileges on * . * to 'alan'@'%';
flush privileges;
create database school;