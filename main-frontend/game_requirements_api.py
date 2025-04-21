from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)

def get_pcgamebenchmark_url(game_name):
    headers = {"User-Agent": "Mozilla/5.0"}
    query = f"{game_name} site:pcgamebenchmark.com"
    url = f"https://www.google.com/search?q={query.replace(' ', '+')}"
    
    res = requests.get(url, headers=headers, timeout=8)  # ✅ FIXED: Missing comma
    if "Our systems have detected unusual traffic" in res.text:
        return None  # ✅ FIXED: You forgot return here
    
    soup = BeautifulSoup(res.text, 'html.parser')
    for link in soup.find_all('a'):
        href = link.get('href')
        if "pcgamebenchmark.com" in href:
            return href.split("/url?q=")[-1].split("&")[0]
    return None

def scrape_requirements(game_url):
    headers = {"User-Agent": "Mozilla/5.0"}
    res = requests.get(game_url, headers=headers, timeout=8)
    soup = BeautifulSoup(res.text, 'html.parser')

    requirements = {
        "minimum": "Not found",
        "recommended": "Not found"
    }

    try:
        spec_sections = soup.find_all("div", class_="system-requirement")
        for section in spec_sections:
            title_tag = section.find("h2")
            content_tag = section.find("ul")
            if title_tag and content_tag:
                title = title_tag.text.lower()
                content = content_tag.text.strip()

                if "minimum" in title:
                    requirements["minimum"] = content
                elif "recommended" in title:
                    requirements["recommended"] = content
    except Exception as e:
        print(f"Scraping error: {e}")
    
    return requirements

@app.route('/api/game-requirements', methods=['POST'])
def get_game_requirements():
    data = request.get_json()
    game_name = data.get('game_name')

    if not game_name:
        return jsonify({"error": "Game name is required"}), 400

    game_url = get_pcgamebenchmark_url(game_name)
    if not game_url:
        return jsonify({"error": "Game page not found"}), 404

    requirements = scrape_requirements(game_url)
    return jsonify({
        "game": game_name,
        "url": game_url,
        "requirements": requirements
    })

if __name__ == '__main__':
    app.run(debug=True)
