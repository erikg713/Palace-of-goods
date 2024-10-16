from flask import Flask, render_template, request, redirect, url_for, flash
from wtforms import Form, StringField, PasswordField, validators

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this in production

class RegistrationForm(Form):
    username = StringField('Username', [validators.Length(min=4, max=25)])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords do not match')
    ])
    confirm = PasswordField('Confirm Password')

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    
    if request.method == 'POST' and form.validate():
        username = form.username.data
        password = form.password.data
        # Here you can add code to save the user to a database
        flash('Registration successful!', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html', form=form)

@app.route('/login')
def login():
    return "Login Page (to be implemented)"

if __name__ == '__main__':
    app.run(debug=True)