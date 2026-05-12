from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app.config["SECRET_KEY"] = "secret_key"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///social.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.debug = True

CORS(app)

db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(120), nullable=False)
    profile_picture = db.Column(
        db.String(255),
        default="https://via.placeholder.com/150"
    )

    posts = db.relationship("Post", backref="user", lazy=True)
    comments = db.relationship("Comment", backref="user", lazy=True)

    def __init__(self, username, password):
        self.username = username
        self.password = password


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    caption = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    comments = db.relationship("Comment", backref="post", lazy=True)

    def __init__(self, image, caption, user_id):
        self.image = image
        self.caption = caption
        self.user_id = user_id


class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey("post.id"), nullable=False)

    def __init__(self, content, user_id, post_id):
        self.content = content
        self.user_id = user_id
        self.post_id = post_id


with app.app_context():
    db.create_all()


@app.route("/")
def index():
    return jsonify({"message": "Backend Flask actif"})


@app.route("/register", methods=["POST"])
def register():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    if len(password) < 6:
        return jsonify({"error": "Le mot de passe doit contenir au moins 6 caractères"}), 400

    user = User(username, password)

    db.session.add(user)
    db.session.commit()

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

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Tous les champs sont obligatoires"}), 400

    user = User.query.filter_by(username=username).first()

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


@app.route("/posts", methods=["GET"])
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

    return jsonify(result)


@app.route("/posts", methods=["POST"])
def add_post():
    data = request.json

    image = data.get("image")
    caption = data.get("caption")
    user_id = data.get("user_id")

    if not image or not caption or not user_id:
        return jsonify({"error": "Image, description et utilisateur obligatoires"}), 400

    post = Post(image, caption, user_id)

    db.session.add(post)
    db.session.commit()

    return jsonify({"message": "Post ajouté"})


@app.route("/posts/<int:post_id>", methods=["GET"])
def get_post(post_id):
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"error": "Post introuvable"}), 404

    comments = []

    for comment in post.comments:
        comments.append({
            "id": comment.id,
            "content": comment.content,
            "username": comment.user.username
        })

    return jsonify({
        "id": post.id,
        "image": post.image,
        "caption": post.caption,
        "username": post.user.username,
        "comments": comments
    })


@app.route("/posts/<int:post_id>/comments", methods=["POST"])
def add_comment(post_id):
    data = request.json

    content = data.get("content")
    user_id = data.get("user_id")

    if not content or not user_id:
        return jsonify({"error": "Commentaire obligatoire"}), 400

    comment = Comment(content, user_id, post_id)

    db.session.add(comment)
    db.session.commit()

    return jsonify({"message": "Commentaire ajouté"})


@app.route("/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404

    posts = []

    for post in user.posts:
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


@app.route("/profile/<int:user_id>", methods=["PUT"])
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
        user.profile_picture = profile_picture

    db.session.commit()

    return jsonify({
        "message": "Profil modifié",
        "user": {
            "id": user.id,
            "username": user.username,
            "profile_picture": user.profile_picture
        }
    })

@app.route("/posts/<int:post_id>", methods=["DELETE"])
def delete_post(post_id):
    post = Post.query.filter_by(id=post_id).first()

    if not post:
        return jsonify({"error": "Post introuvable"}), 404

    for comment in post.comments:
        db.session.delete(comment)

    db.session.delete(post)
    db.session.commit()

    return jsonify({"message": "Post supprimé"})

if __name__ == "__main__":
    app.run(debug=True, port=5001)