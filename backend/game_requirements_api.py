from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)
CORS(app)

def get_ign_url(game_name):
    """Find game page on IGN"""
    search_url = f"https://www.ign.com/search?q={game_name.replace(' ', '+')}+system+requirements"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    
    try:
        res = requests.get(search_url, headers=headers, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Find first search result that looks like a game page
        for result in soup.find_all('a', class_='search-item'):
            href = result.get('href', '')
            if '/games/' in href and 'system-requirements' not in href:
                return f"https://www.ign.com{href}/system-requirements"
        
        return None
    except Exception as e:
        print(f"Error searching IGN: {e}")
        return None

def scrape_ign_requirements(game_url):
    """Scrape requirements from IGN"""
    try:
        res = requests.get(game_url, headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
        }, timeout=10)
        soup = BeautifulSoup(res.text, 'html.parser')
        
        # Get game title
        title = soup.find('h1')
        game_title = title.get_text(strip=True) if title else "Not found"
        
        # Initialize requirements
        requirements = {
            "minimum": "Not available",
            "recommended": "Not available",
            "title": game_title
        }

        # Find all requirement sections
        sections = soup.find_all('div', class_='jsx-424597460')
        
        for section in sections:
            title = section.find('h3')
            if not title:
                continue
                
            title_text = title.get_text(strip=True).lower()
            content = section.get_text("\n", strip=True)
            
            if 'minimum' in title_text:
                requirements["minimum"] = clean_ign_requirements(content)
            elif 'recommended' in title_text:
                requirements["recommended"] = clean_ign_requirements(content)
        
        return requirements
    except Exception as e:
        print(f"Error scraping IGN requirements: {e}")
        return None

def clean_ign_requirements(text):
    """Clean IGN requirements text"""
    # Remove section title
    text = re.sub(r'(minimum|recommended)\s*requirements', '', text, flags=re.IGNORECASE)
    # Remove empty lines and excessive whitespace
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return "\n".join(lines)

@app.route('/api/game-requirements', methods=['POST'])
def get_game_requirements():
    data = request.get_json()
    game_name = data.get('game_name', '').strip()
    
    if not game_name:
        return jsonify({"error": "Please enter a game name"}), 400
    
    game_url = get_ign_url(game_name)
    if not game_url:
        return jsonify({
            "error": f"Could not find system requirements for '{game_name}' on IGN",
            "suggestion": "Try the exact official title (e.g. 'Cyberpunk 2077')"
        }), 404
    
    requirements = scrape_ign_requirements(game_url)
    if not requirements:
        return jsonify({
            "error": "Found game page but couldn't extract requirements",
            "url": game_url,
            "action": f"Please check manually: {game_url}"
        }), 500
    
    return jsonify({
        "game": requirements["title"],
        "url": game_url,
        "requirements": {
            "minimum": requirements["minimum"],
            "recommended": requirements["recommended"]
        },
        "source": "IGN"
    })

if __name__ == '__main__':
    app.run(port=5000, debug=True)