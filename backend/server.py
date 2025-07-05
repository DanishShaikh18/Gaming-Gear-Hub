from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import psycopg2.pool
import os
from dotenv import load_dotenv
from werkzeug.serving import run_simple
import threading
import time

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database Configuration
DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "postgres"),
    "password": os.getenv("DB_PASSWORD", "1234"),
    "database": os.getenv("DB_NAME", "gaming_gear_hub"),
    "port": os.getenv("DB_PORT", "5432")
}

# PostgreSQL Connection Pool
db_pool = None

def test_connection(conn):
    """Test if a connection is valid by executing a simple query"""
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT 1")
            return True
    except:
        return False

def init_db_pool():
    global db_pool
    try:
        db_pool = psycopg2.pool.SimpleConnectionPool(
            minconn=2,
            maxconn=10,
            **DB_CONFIG
        )
        # Test the pool
        conn = db_pool.getconn()
        if test_connection(conn):
            db_pool.putconn(conn)
            print("✅ Database connection pool established")
        else:
            raise Exception("Connection test failed")
    except Exception as err:
        print(f"❌ Database connection failed: {err}")
        db_pool = None

# Initialize the connection pool
init_db_pool()

def get_db_connection():
    """Get a valid database connection with retry logic"""
    if not db_pool:
        return None
    
    max_attempts = 3
    for attempt in range(max_attempts):
        try:
            conn = db_pool.getconn()
            if test_connection(conn):
                return conn
            else:
                db_pool.putconn(conn, close=True)
                raise psycopg2.InterfaceError("Connection test failed")
        except psycopg2.InterfaceError as e:
            print(f"⚠️ Connection attempt {attempt + 1} failed: {e}")
            if attempt == max_attempts - 1:
                return None
            time.sleep(1)
        except Exception as e:
            print(f"⚠️ Unexpected connection error: {e}")
            return None

def connection_maintainer():
    """Maintain connection pool health"""
    while True:
        time.sleep(6000)  # Run every 5 minutes
        if db_pool:
            try:
                conn = db_pool.getconn()
                if not test_connection(conn):
                    print("♻️ Replacing bad connection in pool")
                    db_pool.putconn(conn, close=True)
                else:
                    db_pool.putconn(conn)
            except Exception as e:
                print(f"⚠️ Connection maintenance error: {e}")

# Start maintenance thread
threading.Thread(target=connection_maintainer, daemon=True).start()

# Helper Functions
def clean_price(price):
    try:
        return float(price.replace("₹", "").replace(",", "").strip())
    except:
        return 0.0

# Health Check Endpoint
@app.route('/api/health', methods=['GET'])
def health_check():
    conn = get_db_connection()
    if not conn:
        return jsonify({"status": "unhealthy", "db_connection": False}), 500
    
    try:
        return jsonify({"status": "healthy", "db_connection": True})
    finally:
        if conn:
            db_pool.putconn(conn)

# Categories Endpoints
# @app.route('/api/categories', methods=['GET'])
# def get_categories():
#     conn = get_db_connection()
#     if not conn:
#         return jsonify({"error": "Database connection failed"}), 500

#     try:
#         with conn.cursor() as cursor:
#             cursor.execute("SELECT id, name FROM categories")
#             categories = cursor.fetchall()
#             if not categories:
#                 return jsonify({"error": "No categories found"}), 404
#             return jsonify([{"id": row[0], "name": row[1]} for row in categories])
#     except Exception as e:
#         print(f"Database error: {e}")
#         return jsonify({"error": "Internal server error"}), 500
#     finally:
#         if conn:
#             db_pool.putconn(conn)


@app.route("/api/products/count", methods=["GET"])
def get_product_count():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM products")
            total_count = cursor.fetchone()[0]
            return jsonify({"count": total_count})
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)


# Products Endpoints
@app.route("/api/products", methods=["GET"])
def get_products():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    category_id = request.args.get("category")

    try:
        with conn.cursor() as cursor:
            if category_id:
                cursor.execute(
                    "SELECT id, name, price, image_url, category_id FROM products WHERE category_id = %s",
                    (category_id,)
                )
                
            else:
                cursor.execute("SELECT id, name, price, image_url, category_id FROM products")
  
            return jsonify([
                {
                    "id": row[0],
                    "name": row[1],
                    "price": row[2],
                    "image_url": row[3],
                    "category_id": row[4]
                } for row in cursor.fetchall()
            ])
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)

@app.route("/api/products/<int:product_id>", methods=["GET"])
def get_product_by_id(product_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, name, price, image_url, category_id FROM products WHERE id = %s",
                (product_id,)
            )
            result = cursor.fetchone()
            if result:
                return jsonify({
                    "id": result[0],
                    "name": result[1],
                    "price": result[2],
                    "image_url": result[3],
                    "category_id": result[4]
                })
            return jsonify({"error": "Product not found"}), 404
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)

@app.route('/add-product', methods=['POST'])
def add_product():
    data = request.json
    name = data.get('name')
    price = data.get('price')
    image_url = data.get('image_url')
    category_id = data.get('category_id')
    affiliate_links = data.get('affiliate_links', [])

    conn = get_db_connection()
    cur = conn.cursor()

    try:
        # Insert product
        cur.execute("""
            INSERT INTO products (name, price, image_url, category_id)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (name, price, image_url, category_id))
        product_id = cur.fetchone()[0]

        # Insert affiliate links
        for link in affiliate_links:
            platform = link.get('platform')
            url = link.get('url')
            if platform and url:
                cur.execute("""
                    INSERT INTO affiliate_links (product_id, platform, url)
                    VALUES (%s, %s, %s)
                """, (product_id, platform, url))

        conn.commit()
        return jsonify({'message': 'Product added successfully'}), 201

    except Exception as e:
        conn.rollback()
        print("Error:", e)
        return jsonify({'error': 'Failed to add product'}), 500

    finally:
        cur.close()
        conn.close()

# @app.route("/api/products/<int:product_id>", methods=["PUT"])
# def update_product(product_id):
#     conn = get_db_connection()
#     if not conn:
#         return jsonify({"error": "Database connection failed"}), 500

#     data = request.json
#     if not data.get("name"):
#         return jsonify({"error": "Product name is required"}), 400

#     try:
#         price = clean_price(data.get("price", "0"))
#     except ValueError:
#         return jsonify({"error": "Invalid price format"}), 400

#     try:
#         with conn.cursor() as cursor:
#             # Update product
#             cursor.execute(
#                 """UPDATE products 
#                    SET name = %s, price = %s, image_url = %s, category_id = %s 
#                    WHERE id = %s
#                    RETURNING id, name, price, image_url, category_id""",
#                 (data["name"], price, data.get("image_url", ""), 
#                  data.get("category_id", 1), product_id)
#             )
#             result = cursor.fetchone()
            
#             # Update affiliate links (delete old ones first)
#             cursor.execute("DELETE FROM affiliate_links WHERE product_id = %s", (product_id,))
            
#             if data.get("affiliateLinks"):
#                 for link in data["affiliateLinks"]:
#                     if link.get("platform") and link.get("url"):
#                         cursor.execute(
#                             """INSERT INTO affiliate_links 
#                                (product_id, platform, url) 
#                                VALUES (%s, %s, %s)""",
#                             (product_id, link["platform"], link["url"])
#                         )
            
#             conn.commit()
#             return jsonify({
#                 "message": "Product updated successfully",
#                 "product": {
#                     "id": result[0],
#                     "name": result[1],
#                     "price": result[2],
#                     "image_url": result[3],
#                     "category_id": result[4]
#                 }
#             }), 200
#     except Exception as e:
#         print(f"Update error: {e}")
#         conn.rollback()
#         return jsonify({"error": "Internal server error"}), 500
#     finally:
#         if conn:
#             db_pool.putconn(conn)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    conn = get_db_connection()
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT id, name, image_url FROM categories")
            categories = cursor.fetchall()
            return jsonify([
                {
                    "id": row[0],
                    "name": row[1],
                    "image_url": row[2] or None  # Convert NULL to None
                }
                for row in categories
            ])
    finally:
        if conn:
            db_pool.putconn(conn)

@app.route('/api/categories/count', methods=['GET'])
def get_category_count():
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        with conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM categories")
            count = cursor.fetchone()[0]
            return jsonify({"count": count})
    except Exception as e:
        print(f"Count error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)



@app.route("/api/products/<int:product_id>", methods=["PUT"])
def update_product(product_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    data = request.json
    try:
        price = float(data.get("price", 0))
    except ValueError:
        return jsonify({"error": "Invalid price format"}), 400

    try:
        with conn.cursor() as cursor:
            # Update product
            cursor.execute(
                """UPDATE products 
                   SET name = %s, price = %s, image_url = %s, category_id = %s 
                   WHERE id = %s
                   RETURNING id, name, price, image_url, category_id""",
                (data.get("name"), price, data.get("image_url", ""), 
                 data.get("category_id", 1), product_id)
            )
            result = cursor.fetchone()
            
            # Update affiliate links
            cursor.execute("DELETE FROM affiliate_links WHERE product_id = %s", (product_id,))
            for link in data.get("affiliateLinks", []):
                cursor.execute(
                    "INSERT INTO affiliate_links (product_id, platform, url) VALUES (%s, %s, %s)",
                    (product_id, link.get("platform"), link.get("url")))
            
            conn.commit()
            return jsonify({
                "id": result[0],
                "name": result[1],
                "price": result[2],
                "image_url": result[3],
                "category_id": result[4],
                "affiliateLinks": data.get("affiliateLinks", [])
            }), 200
    except Exception as e:
        conn.rollback()
        print(f"Update error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        if conn:
            db_pool.putconn(conn)


@app.route("/api/products/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            # First delete affiliate links (due to foreign key constraint)
            cursor.execute("DELETE FROM affiliate_links WHERE product_id = %s", (product_id,))
            # Then delete the product
            cursor.execute("DELETE FROM products WHERE id = %s RETURNING id", (product_id,))
            
            if not cursor.fetchone():
                return jsonify({"error": "Product not found"}), 404
                
            conn.commit()
            return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        print(f"Delete error: {e}")
        conn.rollback()
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)

# Affiliate Links Endpoints
@app.route('/api/products/<int:product_id>/affiliate_links', methods=['GET'])
def get_product_affiliate_links(product_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            cursor.execute(
                "SELECT id, platform, url FROM affiliate_links WHERE product_id = %s",
                (product_id,)
            )
            return jsonify([
                {"id": row[0], "platform": row[1], "url": row[2]} 
                for row in cursor.fetchall()
            ])
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)


@app.route("/api/trending", methods=["GET"])
def get_trending():
    try:
        # Connect to the database
        conn = get_db_connection()
        cursor = conn.cursor()

        # Query to fetch data from the trending table
        cursor.execute("SELECT name, image_url, short_desc, affiliate_link FROM trending")
        trending_data = cursor.fetchall()

        # Convert the data to a list of dictionaries
        trending_list = [
            {
                "name": item[0],
                "image_url": item[1],
                "short_desc": item[2],
                "affiliate_link": item[3]
            }
            for item in trending_data
        ]

        # Close the cursor and connection
        cursor.close()
        conn.close()

        return jsonify(trending_list), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/api/products', methods=['GET'])
# def get_products_by_category():
#     category_id = request.args.get('category_id')
#     if not category_id:
#         return jsonify({"error": "Category ID is required"}), 400

#     try:
#         conn = get_db_connection()
#         cur = conn.cursor()
#         cur.execute('''SELECT p.product_id, p.name, p.short_description, p.base_price, p.specs, p.is_trending, p.image_url 
#                        FROM products p 
#                        WHERE p.category_id = %s AND p.is_active = TRUE''', (category_id,))
#         products = cur.fetchall()
#         cur.close()
#         conn.close()

#         # Transform query result into JSON format
#         product_list = []
#         for product in products:
#             product_dict = {
#                 "product_id": product[0],
#                 "name": product[1],
#                 "short_description": product[2],
#                 "base_price": product[3],
#                 "specs": product[4],
#                 "is_trending": product[5],
#                 "image_url": product[6]  # Assuming you store image_url in products
#             }
#             product_list.append(product_dict)

#         return jsonify(product_list)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500


@app.route('/api/products/category/<int:category_id>', methods=['GET'])
def get_products_by_category(category_id):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    try:
        with conn.cursor() as cursor:
            # Query to get products with their affiliate links
            cursor.execute("""
                SELECT 
                    p.id, p.name, p.price, p.image_url, p.category_id,
                    COALESCE(
                        json_agg(json_build_object(
                            'platform', a.platform,
                            'url', a.url
                        )) FILTER (WHERE a.id IS NOT NULL),
                        '[]'::json
                    ) AS affiliate_links
                FROM products p
                LEFT JOIN affiliate_links a ON p.id = a.product_id
                WHERE p.category_id = %s
                GROUP BY p.id
            """, (category_id,))
            
            products = cursor.fetchall()
            
            # Convert to proper JSON format
            result = []
            for product in products:
                result.append({
                    'id': product[0],
                    'name': product[1],
                    'price': float(product[2]),  # Convert Decimal to float
                    'image_url': product[3],
                    'category_id': product[4],
                    'affiliate_links': product[5]
                })
            
            return jsonify(result)
    except Exception as e:
        print(f"Database error: {e}")
        return jsonify({"error": "Internal server error"}), 500
    finally:
        if conn:
            db_pool.putconn(conn)

if __name__ == "__main__":
    run_simple(
        'localhost',
        5000,
        app,
        threaded=True,
        processes=1,
        use_reloader=True,
        use_debugger=True,
        use_evalex=True
    )