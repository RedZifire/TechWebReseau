from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)  #creation de l'application flask

app.config["SECRET_KEY"] = "secret_key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///social.db" #on créé un file db.sqlite où on sauvegarde tous les donnés
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.debug = True

CORS(app)

db = SQLAlchemy(app)


# ---------------- MODELS ----------------

class User(db.Model): #cette classe represente un tableau dans le database et ça a comme colonnes:
    id = db.Column(db.Integer, primary_key=True) #identificateur unique du User: c'est un int (integer), le nombre associé a chaque username 
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(
        db.String(255),
        default="https://via.placeholder.com/150"
    )

    posts = db.relationship("Post", backref="user", lazy=True) #pour la relation user-post
    comments = db.relationship("Comment", backref="user", lazy=True) #relation user-commentaire

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Post(db.Model): #autre tableau, créé pour les post
    id = db.Column(db.Integer, primary_key=True) 
    image = db.Column(db.String(255), nullable=False) #sauvgarde le URL de l'image
    caption = db.Column(db.String(255), nullable=False) #description de l'image
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False) #sauvgarde l'id du User qui a créé le post

    comments = db.relationship("Comment", backref="post", lazy=True) #comments sous le post (donc rélation comments-post)

    def __init__(self, image, caption, user_id):
        self.image = image
        self.caption = caption
        self.user_id = user_id


class Comment(db.Model): #pour créer des commentaires
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False) #quoi on a écrit
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False) #qui a écrit
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False) #dans quel post

    def __init__(self, content, user_id, post_id):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id


with app.app_context():
    db.create_all() #création de la base de données (qui ne s'éfface pas chaque fois)


# ---------------- ROUTES ----------------
#les routes sont les URL du site

@app.route("/")
def index():
    return jsonify({"message": "Backend Flask actif"})


@app.route("/register", methods=["POST"]) #pour se registrer, accepte requestes POST (envoyer données du login) (request est un objet qui représente la requeste HTTP arrivé du broswer)
def register():
    data = request.json #data sont les donné de la requeste qui arrivent du broswer (request est un objet qui représente la requeste HTTP arrivé du broswer)
    username = data.get("username") 
    password = data.get("password") 

    if not username or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    if len(password) < 6:
        return jsonify({"error": "Le mot de passe doit contenir au moins 6 caractères"}), 400

    user = User(username, password)  #on a créé le nouveau utent

    db.session.add(user)
    db.session.commit() #on sauvgarde dans le db de la session

    return jsonify({
        "message": "Compte créé",
        "user": {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture
        }
    }) 


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username") #on cherche cet utent dans le db et on vérifie que la password soit sorrecte
    password = data.get("password")

    if not username or not password: 
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    user = User.query.filter_by(username=username).first() #on cherche cet utent (le premier qui sort) dans le db

    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 401

    if user.password != password: 
        return jsonify({"error": "Mot de passe incorrect"}), 401

    return jsonify({
        "message": "Connexion réussie",
        "user": {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture
        }
    })


@app.route("/posts", methods=["GET"]) #chercher dans le db les posts de quelcqu'un 
def get_posts():
    posts = Post.query.all()
    result = []

    for post in posts:
        result.append({
            "id": post.id,
            "image": post.image,
            "caption": post.caption,
            "username": post.user.username,
            "user_id": post.user_id
        })

    return jsonify(result) #jsonify sert pour convertir py en language complréhensible pour des autres languages 


@app.route("/posts", methods=["POST"]) #ajouter un post
def add_post():
    data = request.json

    image = data.get("image")
    caption = data.get("caption")
    user_id = data.get("user_id")

    if not image or not caption or not user_id:
        return jsonify({"error": "Image, description et utilisateur obligatoires"}), 400

    post = Post(image, caption, user_id) #création du post

    db.session.add(post)
    db.session.commit() #sauvgardé dans db

    return jsonify({"message": "Post ajouté"})


@app.route("/posts/<int:post_id>", methods=["GET"]) #chercher un post de qqn et l'affichier (avec commentaires)
def get_post(post_id):
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"error": "Post introuvable"}), 404

    comments = []

    for comment in post.comments:
        comments.append({
            "id": comment.id,
            "content": comment.content,
            "username": comment.user.username,
            "user_id": comment.user_id
        })

    return jsonify({
        "id": post.id,
        "image": post.image,
        "caption": post.caption,
        "username": post.user.username,
        "comments": comments
    })


@app.route("/posts/<int:post_id>/comments", methods=["POST"]) #ajouter un commentaire sous un post
def add_comment(post_id):
    data = request.json

    content = data.get("content")
    user_id = data.get("user_id")

    if not content or not user_id:
        return jsonify({"error": "Commentaire obligatoire"}), 400

    comment = Comment(content, user_id, post_id) #creation du commentaire

    db.session.add(comment)
    db.session.commit() #sauvgardé dans le db

    return jsonify({"message": "Commentaire ajouté"})


@app.route("/profile/<int:user_id>", methods=["GET"]) #chercher qqn
def get_profile(user_id):
    user = User.query.filter_by(id=user_id).first() #on cherche cet utent (le premier qui sort) dans le db

    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    posts = []

    for post in user.posts: #on cherche ses posts
        posts.append({
            "id": post.id,
            "image": post.image,
            "caption": post.caption,
            "username": user.username
        })

    return jsonify({
        "id": user.id,
        "username": user.username,
        "profile_picture": user.profile_picture,
        "posts": posts
    })


@app.route("/profile/<int:user_id>", methods=["PUT"]) #on modifice le profil
def update_profile(user_id):
    user = User.query.filter_by(id=user_id).first() 

    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    data = request.json

    username = data.get("username")
    profile_picture = data.get("profile_picture")

    if not username:
        return jsonify({"error": "Pseudo obligatoire"}), 400

    user.username = username

    if profile_picture: 
        user.profile_picture = profile_picture #mettre à jour la photo

    db.session.commit() 

    return jsonify({
        "message": "Profil modifié",
        "user": {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture
        }
    })

@app.route("/posts/<int:post_id>", methods=["DELETE"]) #eliminer un psot
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"error": "Post introuvable"}), 404

    for comment in post.comments:
        db.session.delete(comment)

    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post supprimé"})

@app.route("/comments/<int:comment_id>", methods=["DELETE"]) #supprimer les commentaires 
def delete_comment(comment_id):
    comment = Comment.query.filter_by(id=comment_id).first()

    if not comment:
        return jsonify({"error": "Commentaire introuvable"}), 404

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Commentaire supprimé"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)