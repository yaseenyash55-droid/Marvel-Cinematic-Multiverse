import urllib.request
import re

cast = [
    ("rdj", "https://upload.wikimedia.org/wikipedia/commons/9/94/Robert_Downey_Jr_2014_Comic_Con_%28cropped%29.jpg"),
    ("pedro", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Pedro_Pascal_by_Gage_Skidmore.jpg/800px-Pedro_Pascal_by_Gage_Skidmore.jpg"),
    ("vanessa", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Vanessa_Kirby_Vogue_2021.jpg/800px-Vanessa_Kirby_Vogue_2021.jpg"),
    ("joseph", "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Joseph_Quinn_by_Gage_Skidmore.jpg/800px-Joseph_Quinn_by_Gage_Skidmore.jpg"),
    ("ebon", "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Ebon_Moss-Bachrach_%2834710185121%29_%28cropped%29.jpg/800px-Ebon_Moss-Bachrach_%2834710185121%29_%28cropped%29.jpg")
]

for name, url in cast:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        data = urllib.request.urlopen(req).read()
        with open(f"public/images/{name}.jpg", "wb") as f:
            f.write(data)
        print(f"Downloaded {name}")
    except Exception as e:
        print(f"Failed {name}: {e}")
