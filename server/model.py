from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
import os
import redis


db = SQLAlchemy()

class User(db.Model):
    """User information"""

    __tablename__ = 'users2'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)   
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(20), nullable=False)
    password = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=True)


    def __repr__(self):

        return f'<User user_id={self.user_id} email={self.email}>'
                   

class Task(db.Model):
    """Task information"""

    __tablename__ = 'tasks2'

    task_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    task_desc = db.Column(db.Text, nullable=False)
    add_notes = db.Column(db.Text, nullable=True)
    # priority = db.Column(db.String(5), nullable=False)
    created_date = db.Column(db.DateTime, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    completed = db.Column(db.Boolean, nullable=False)
    user_id = db.Column(db.Integer, 
                        db.ForeignKey('users2.user_id'), index=True)


    # Define relationship to user
    user = db.relationship('User', backref=db.backref('tasks2', order_by=task_id))


    def __repr__(self):

        return f'<Task task_id={self.task_id} completed={self.completed}'



def connect_to_db(app, db_uri='redis://127.0.0.1:6379'):

    userpass = "mysql+pymysql://root:@"
    basedir = "127.0.0.1:3306"
    dbname = "/budget_app"
    socket = "?unix_socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock"
    ip_address = "10.100.0.2"

    app.config['SECRET_KEY'] = os.enviorn["SECRET_KEY"]
    app.config['JWT_SECRET_KEY'] = os.environ["JWT_SECRET_KEY"]
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
    app.config['SQLALCHEMY_DATABASE_URI'] = userpass + basedir + dbname
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SESSION_TYPE'] = "redis"
    app.config['SESSION_REDIS'] = redis.from_url(db_uri)
    app.config['SESSION_USE_SIGNER'] = True
    app.config['SESSION_PERMANENT'] = False
    db.app = app
    db.init_app(app)


if __name__ == '__main__':

    from server import app
    connect_to_db(app)
    db.create_all()
    print('Connected to DB.')