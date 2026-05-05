from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.secret_key = "secret"
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite"
db = SQLAlchemy(app)

# ---------------- MODELS ----------------

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(80))

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200))
    caption = db.Column(db.String(200))
    user_id = db.Column(db.Integer)

# ---------------- ROUTES ----------------

@app.route("/")
def index():
    return redirect("/login")

# LOGIN
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")

        user = User.query.filter_by(username=username).first()

        if user:
            session["user"] = user.username
            return redirect("/profile")

        return "User not found", 400

    return render_template("login.html")

# REGISTER
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        user = User(
            username=request.form.get("username"),
            password=request.form.get("password")
        )

        db.session.add(user)
        db.session.commit()

        return redirect("/login")

    return render_template("register.html")

# PROFILE
@app.route("/profile")
def profile():
    if "user" not in session:
        return redirect("/login")

    return render_template("profile.html", user=session["user"])

# HOME / FEED
@app.route("/home")
def home():
    posts = Post.query.all()
    return render_template("home.html", posts=posts)

# LOGOUT
@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect("/login")

# ADD POST
@app.route("/add_post", methods=["POST"])
def add_post():
    post = Post(
        image=request.form.get("image"),
        caption=request.form.get("caption")
    )

    db.session.add(post)
    db.session.commit()

    return redirect("/home")

# ---------------- RUN ----------------

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)