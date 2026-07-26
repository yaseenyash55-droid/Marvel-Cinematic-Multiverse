import urllib.request
import re

url = 'https://en.wikipedia.org/wiki/Doctor_Strange_(2016_film)'
out_file = 'public/images/strange.jpg'

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0.0.0 Safari/537.36'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'property="og:image" content="(.*?)"', html)
    if match:
        img_url = match.group(1)
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/115.0.0.0 Safari/537.36'})
        img_data = urllib.request.urlopen(req).read()
        with open(out_file, 'wb') as f:
            f.write(img_data)
        print('Saved', out_file)
    else:
        print('Not found for', url)
except Exception as e:
    print('Failed for', url, e)
