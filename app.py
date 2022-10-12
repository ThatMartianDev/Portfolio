from flask import Flask


class config:
    DEBUG = True
    SECRET_KEY = "Watcha looking at :)"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

def create_app(config_obj=config):
    app = Flask(__name__)
    app.config.from_object(config_obj)

    return app