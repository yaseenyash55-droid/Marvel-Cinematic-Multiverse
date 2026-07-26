import os

mobile_css = {
    "components/ui/ui.module.css": """
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
"""
}

for filepath, css_to_append in mobile_css.items():
    if os.path.exists(filepath):
        with open(filepath, "a") as f:
            f.write(css_to_append)
        print(f"Updated {filepath}")
    else:
        print(f"Skipped {filepath} - not found")
