from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

# **📌 Connect to MySQL**
try:
    db = mysql.connector.connect(
        host=os.getenv("DB_HOST", "127.0.0.1"),  
        user=os.getenv("DB_USER", "root"),  
        password=os.getenv("DB_PASSWORD", "root"),  
        database=os.getenv("DB_NAME", "gaming_gear_admin")
    )
    cursor = db.cursor(dictionary=True)  # ✅ Define cursor here
    print("✅ Connected to MySQL Database")
except mysql.connector.Error as err:
    print(f"❌ Error connecting to MySQL: {err}")
    cursor = None  # Prevent further errors if DB connection fails

@app.route("/api/products", methods=["POST"])
def add_product():
    if cursor is None:
        return jsonify({"error": "Database connection failed"}), 500
    
    data = request.json
    name = data["name"]
    price = data["price"]
    image_url = data["image"]
    affiliate_links = data["affiliateLinks"]

    # **✅ Clean Price (Remove ₹ and Commas)**
    cleaned_price = price.replace("₹", "").replace(",", "").strip()

    try:
        # Insert product into MySQL
        cursor.execute("INSERT INTO products (name, price, image_url) VALUES (%s, %s, %s)", 
                       (name, cleaned_price, image_url))
        db.commit()
        product_id = cursor.lastrowid

        # Insert affiliate links
        for link in affiliate_links:
            cursor.execute("INSERT INTO affiliate_links (product_id, platform, url) VALUES (%s, %s, %s)", 
                           (product_id, link["platform"], link["url"]))
        db.commit()

        return jsonify({"message": "Product added successfully ✅"}), 201
    except mysql.connector.Error as e:
        return jsonify({"error": str(e)}), 500


# **📌 API Route: Fetch All Products**
@app.route("/api/products", methods=["GET"])
def get_products():
    if cursor is None:
        return jsonify({"error": "Database connection failed"}), 500

    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    return jsonify(products)

# **📌 Run Flask Server**
if __name__ == "__main__":
    app.run(debug=True, port=5000)
