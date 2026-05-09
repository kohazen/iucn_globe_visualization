# IUCN 3D Globe

Three interactive globes exploring animal conservation, country performance, and forest cover.

## Setup

1. Open any `.html` file in a text editor
2. Find: `const IUCN_KEY = "YOUR_IUCN_API_KEY_HERE";`
3. Replace with your IUCN Red List API token
   → Get a free token at https://apiv3.iucnredlist.org
4. Repeat for the other two files (only needed for `globe_species.html` — the other two use bundled data)
5. Open any file in your browser — no server needed

## Views

| File | What it shows |
|------|--------------|
| `globe_species.html` | 200 threatened species as dots — click any to see IUCN data |
| `globe_conservation.html` | NCI 2024 conservation score per country (choropleth) |
| `globe_forest.html` | FAO 2020 forest cover % per country (choropleth) |

## Controls

- **Drag** to rotate · **Scroll** to zoom
- Globe auto-rotates — hover to pause
- **☀️** button (top right) toggles dark/light mode
- Use the **nav bar** to switch between views
- In Species Map: click **CR / EN / VU** buttons to filter species by status

## Data sources

- Species data: IUCN Red List API v3 (https://apiv3.iucnredlist.org)
- Conservation scores: Nature Conservation Index 2024 (https://biodb.com/nci/)
- Forest cover: FAO Global Forest Resources Assessment 2020 (https://www.fao.org/forest-resources-assessment)
- Animal images: Wikipedia REST API (no key required)

## Notes

- Species dots use a deterministic jitter algorithm so overlapping species in dense regions separate into individually clickable dots
- All species/country data is bundled inline — no server or build step needed
- IUCN API is only called when you click a species dot (with a valid API key set)
- Species sidebar caches results in memory so repeat clicks don't re-fetch
