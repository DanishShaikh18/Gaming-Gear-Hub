import mysql.connector
import os

db = mysql.connector.connect(
    host="127.0.0.1",  # Change if needed
    user="root",  # Change to your MySQL username
    password="root",  # Add your MySQL password if set
    database="gaming_gear_admin"  # Ensure this database exists
)

print("✅ Connected to MySQL Database")
