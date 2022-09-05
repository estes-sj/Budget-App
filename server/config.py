import configparser
from dotenv import load_dotenv
import os
import redis

load_dotenv()

config = configparser.ConfigParser()
config.read_file(open(r'server_config.txt'))
ip_address = config.get('Server Config', 'sql_address')

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379")