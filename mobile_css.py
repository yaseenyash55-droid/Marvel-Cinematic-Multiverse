import os

mobile_css = {
    "components/ui/dashboard.module.css": """
@media (max-width: 768px) {
  .dashboard {
    top: auto;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    flex-direction: row;
    gap: 10px;
    background: rgba(0,0,0,0.5);
    padding: 10px 20px;
    border-radius: 30px;
    backdrop-filter: blur(10px);
  }
  .label {
    display: none;
  }
}
""",
    "components/ui/header.module.css": """
@media (max-width: 768px) {
  .header {
    padding: 15px 20px;
  }
  .mark {
    font-size: 1.5rem;
  }
  .links {
    display: none; /* Hide standard links on mobile to save space, rely on dashboard nav */
  }
}
""",
    "components/overlays/gallery.module.css": """
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .card {
    height: 300px;
  }
}
""",
    "components/overlays/cast.module.css": """
@media (max-width: 768px) {
  .container {
    padding: 20px;
  }
  .title {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .grid {
    gap: 15px;
    max-height: 70vh;
    overflow-y: auto;
    padding-bottom: 20px;
  }
  .card {
    width: 160px;
    height: 240px;
  }
}
""",
    "components/overlays/orbit.module.css": """
@media (max-width: 768px) {
  .orbitContainer {
    transform: scale(0.6);
  }
}
""",
    "components/overlays/story.module.css": """
@media (max-width: 768px) {
  .panel {
    padding: 20px;
  }
  .title {
    font-size: 2rem;
  }
  .desc {
    font-size: 1rem;
    max-width: 100%;
  }
}
""",
    "components/overlays/reel.module.css": """
@media (max-width: 768px) {
  .card {
    width: 280px;
    height: 400px;
    margin: 0 10px;
  }
  .date {
    font-size: 1.2rem;
  }
  .title {
    font-size: 1.5rem;
  }
}
""",
    "components/overlays/timeline.module.css": """
@media (max-width: 768px) {
  .timelineContainer {
    padding-top: 40px;
  }
  .timelineHeader {
    font-size: 2rem;
  }
}
""",
    "components/ui/footer.module.css": """
@media (max-width: 768px) {
  .inner {
    flex-direction: column;
    gap: 30px;
  }
  .base {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}
""",
    "app/globals.css": """
@media (max-width: 768px) {
  html, body {
    font-size: 14px;
  }
}
"""
}

for filepath, css_to_append in mobile_css.items():
    if os.path.exists(filepath):
        with open(filepath, "a") as f:
            f.write(css_to_append)
        print(f"Updated {filepath}")
    else:
        print(f"Skipped {filepath} - not found")
