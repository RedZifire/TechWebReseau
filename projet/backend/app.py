from flask import Flask, render_template, request, redirect, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__) #creation de l'application flask
app.secret_key = "secret" #pour eviter qu'on puisse modifier le cookies manuellement
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db.sqlite" #on créé un file db.sqlite où on sauvegarde tous les donnés
db = SQLAlchemy(app)

# ---------------- MODELS ----------------

class User(db.Model): #cette classe represente un tableau dans le database et ça a comme colonnes:
    id = db.Column(db.Integer, primary_key=True) #identificateur unique du User: c'est un int (integer), le nombre associé a chaque username 
    username = db.Column(db.String(80), unique=True) #le username doit être unique (max 80 caractères)
    password = db.Column(db.String(80))

class Post(db.Model): #autre tableau, crée pour les post
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(200)) #sauvgarde le URL de l'image
    caption = db.Column(db.String(200)) #description de l'image
    user_id = db.Column(db.Integer) #sauvgarde l'id du User qui a créé le post 

# ---------------- ROUTES ----------------
#les routes sont les URL du site
@app.route("/")
def index(): 
    return redirect("/login")

# LOGIN
@app.route("/login", methods=["GET", "POST"]) #accepte requestes GET (visualiser le form login) et POST (envoyer données du login)
def login():
    if request.method == "POST": #request est un objet qui représente la requeste HTTP arrivé du broswer
        username = request.form.get("username") #on remplace username avec le name choisi par l'utilisateur contenu dans form (request.form contient les données envoyées par le form HTML)

        user = User.query.filter_by(username=username).first() #on cherche cet utent dans le db

        if user: #si on le trouve
            session["user"] = user.username #on sauvgarde le login dans la session
            return redirect("/profile") #et on l'evoye à la page profile

        return "User not found", 400 

    return render_template("login.html")

# REGISTER
@app.route("/register", methods=["GET", "POST"]) #methode GET aussi car c'est une autre page
def register():
    if request.method == "POST":
        user = User(
            username=request.form.get("username"),
            password=request.form.get("password")
        ) #on a créé le nouveau utent

        db.session.add(user)
        db.session.commit() #on sauvgarde dans le db

        return redirect("/login") #et on retourne au login pour acceder

    return render_template("register.html")

# PROFILE
@app.route("/profile") #pas de methodes GET ou POST, alors py utilise GET par défault (pas besoin d'écrire: methods=["GET"])
def profile():
    if "user" not in session: #si pour cette session on s'est pas encore authentifié (connecté)
        return redirect("/login")

    return render_template("profile.html", user=session["user"])

# HOME / FEED
@app.route("/home")
def home():
    posts = Post.query.all() #on prend tout ce qu'il y a dans le tableau post
    return render_template("home.html", posts=posts) #on retourne les données et HTML peut utiliser ces données

# LOGOUT
@app.route("/logout")
def logout():
    session.pop("user", None) #on efface ce user de cette session (si il y a pas: None, pour eviter erreurs)
    return redirect("/login")

# ADD POST
@app.route("/add_post", methods=["POST"]) #permet de faire quelque chose donc il faut que la metode POST
def add_post():
    post = Post(
        image=request.form.get("image"),
        caption=request.form.get("caption")
    ) #création du post (avec les données du form)

    db.session.add(post)
    db.session.commit() #ajouter le post au db

    return redirect("/home")

# ---------------- RUN ----------------

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)