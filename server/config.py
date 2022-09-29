import configparser
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import os
import redis

load_dotenv()

config = configparser.ConfigParser()
config.read_file(open(r'server_config.txt'))

userpass = config.get('Server Config', 'userpass')
basedir = config.get('Server Config', 'basedir')
dbname = config.get('Server Config', 'dbname')

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = userpass + basedir + dbname
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")