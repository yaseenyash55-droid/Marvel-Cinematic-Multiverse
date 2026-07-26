import urllib.request
import re

cast = [
    ("rdj", "https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3UP0rm4tKwxIQ.jpg"),
    ("pedro", "https://image.tmdb.org/t/p/w500/lrsjncoCGfsIrcxoEhaVNEfsPpo.jpg"),
    ("vanessa", "https://image.tmdb.org/t/p/w500/zluWlhTqC9gYntV2LdFf6zLqAvo.jpg"),
    ("joseph", "https://image.tmdb.org/t/p/w500/n5E8EhwB9xQ5F9X8U9YQYpZJ1oJ.jpg"),
    ("ebon", "https://image.tmdb.org/t/p/w500/7aD8hV5x9YfFvJ9iCjYk5Qf9M5N.jpg")
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
