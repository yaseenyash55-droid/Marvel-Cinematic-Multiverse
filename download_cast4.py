import urllib.request
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

cast = [
    ("vanessa", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Vanessa_Kirby_in_2024.jpg/800px-Vanessa_Kirby_in_2024.jpg"),
    ("joseph", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Joseph_Quinn_by_Gage_Skidmore.jpg/800px-Joseph_Quinn_by_Gage_Skidmore.jpg"),
    ("ebon", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ebon_Moss-Bachrach_%2834710185121%29_%28cropped%29.jpg/800px-Ebon_Moss-Bachrach_%2834710185121%29_%28cropped%29.jpg")
]

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}

for name, url in cast:
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req).read()
        with open(f"public/images/{name}.jpg", "wb") as f:
            f.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
