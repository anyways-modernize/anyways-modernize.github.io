# Weekly Quests Schema

The file [weeklyquests.json](weeklyquests.json) must contain a JSON array.

Each item must be an object with these required properties:

- `text`: string
- `url`: string

Example:

```json
[
  {
    "text": "Short description for this week's quest.",
    "url": "https://example.com/"
  }
]
```

Rules:

- Keep the top-level value as an array.
- Keep every entry in the display order you want the weekly rotation to follow.
- Do not add comments to the JSON file.
- Use full `https://` URLs.
- Do not leave `text` or `url` empty.
