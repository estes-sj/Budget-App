from models import Ledger



def show_data():
    return r'<h1>IT WORKS!<h1>'
""" 
    entries = Ledger.query.filter_by(id=1)

    for entry in entries:
        print('Email:', entry.email)
        print('Cost:', entry.cost) """
