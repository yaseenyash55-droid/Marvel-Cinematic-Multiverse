import urllib.request
import json
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

url = "https://en.wikipedia.org/w/api.php?action=query&titles=Joseph_Quinn&prop=pageimages&format=json&pithumbsize=500"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    data = urllib.request.urlopen(req).read()
    js = json.loads(data)
    pages = js["query"]["pages"]
    page_id = list(pages.keys())[0]
    img_url = pages[page_id]["thumbnail"]["source"]
    print(f"Joseph_Quinn: {img_url}")
except Exception as e:
    print(f"Failed Joseph_Quinn: {e}")
