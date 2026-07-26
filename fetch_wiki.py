import urllib.request
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

actors = ["Vanessa_Kirby", "Joseph_Quinn_(actor)", "Ebon_Moss-Bachrach"]
urls = []

for actor in actors:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={actor}&prop=pageimages&format=json&pithumbsize=500"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = urllib.request.urlopen(req).read()
        js = json.loads(data)
        pages = js["query"]["pages"]
        page_id = list(pages.keys())[0]
        img_url = pages[page_id]["thumbnail"]["source"]
        print(f"{actor}: {img_url}")
    except Exception as e:
        print(f"Failed {actor}: {e}")
