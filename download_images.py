import urllib.request
import re
def get_wiki_img(url, out_file):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'property="og:image" content="(.*?)"', html)
        if match:
            img_url = match.group(1)
            req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
            img_data = urllib.request.urlopen(req).read()
            with open(out_file, 'wb') as f:
                f.write(img_data)
            print('Saved', out_file)
        else:
            print('Not found for', url)
    except Exception as e:
        print('Failed for', url, e)

chars = [
    ('https://en.wikipedia.org/wiki/Captain_America', 'public/images/cap.jpg'),
    ('https://en.wikipedia.org/wiki/Iron_Man', 'public/images/ironman.jpg'),
    ('https://en.wikipedia.org/wiki/Thor_(Marvel_Comics)', 'public/images/thor.jpg'),
    ('https://en.wikipedia.org/wiki/Spider-Man', 'public/images/spidey.jpg'),
    ('https://en.wikipedia.org/wiki/Wolverine_(character)', 'public/images/wolverine.jpg'),
    ('https://en.wikipedia.org/wiki/Doctor_Doom', 'public/images/doom.jpg'),
    ('https://en.wikipedia.org/wiki/Doctor_Strange', 'public/images/strange.jpg'),
    ('https://en.wikipedia.org/wiki/Mister_Fantastic', 'public/images/mrfantastic.jpg')
]

for url, path in chars:
    get_wiki_img(url, path)
