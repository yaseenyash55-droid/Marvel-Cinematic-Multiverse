import urllib.request
def dl(url, path):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0'})
    img_data = urllib.request.urlopen(req).read()
    with open(path, 'wb') as f:
        f.write(img_data)
    print("Downloaded", path)

dl("https://upload.wikimedia.org/wikipedia/en/3/37/Captain_America_The_First_Avenger_poster.jpg", "public/images/cap.jpg")
dl("https://upload.wikimedia.org/wikipedia/en/c/c7/Doctor_Strange_poster.jpg", "public/images/strange.jpg")
