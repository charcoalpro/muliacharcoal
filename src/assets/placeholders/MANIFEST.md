# Asset placeholder manifest — homepage

Real assets to drop into `/public/` (or `/src/assets/`) before launch.
Components currently render `ImagePlaceholder` until the file exists at
the path below.

| Slot                    | Path                              | Notes                               |
| ----------------------- | --------------------------------- | ----------------------------------- |
| Hero background         | `/public/home/hero.jpg`           | 1920×1080 max, AVIF preferred       |
| Owner / factory portrait | `/public/team/wilson-gosalim.jpg` | 800×800 square, JPEG                |
| Product — Cube          | `/public/products/cube.svg`       | Or photo 800×450                    |
| Product — Stix / Finger | `/public/products/stix.svg`       | "                                   |
| Product — Hexagonal     | `/public/products/hexagonal.svg`  | "                                   |
| Product — Dome          | `/public/products/dome.svg`       | "                                   |
| Product — Flat / Slab   | `/public/products/flat.svg`       | "                                   |
| Product — Lotus / Cloud | `/public/products/lotus.svg`      | "                                   |
| Factory photo 1–6       | `/public/home/factory-{1..6}.jpg` | 1200×800, JPEG                      |
| Container loading 1–3   | `/public/home/container-{1..3}.jpg`| 1200×800, JPEG                     |
| Vertical loading video 1| YouTube ID + poster slot          | aspect 9/16; ID feeds YouTubeLite   |
| Vertical loading video 2| YouTube ID + poster slot          | aspect 9/16                         |
| Factory tour video      | YouTube ID                        | 16/9; About block                   |
| Logos: REACH            | `/public/logos/reach.svg`         | mono SVG preferred                  |
| Logos: ISO 9001         | `/public/logos/iso-9001.svg`      | "                                   |
| Logos: Carsurin         | `/public/logos/carsurin.svg`      | "                                   |
| Logos: Beckjorindo      | `/public/logos/beckjorindo.svg`   | "                                   |
| Logos: Maersk / MSC / CMA CGM | `/public/logos/{maersk,msc,cmacgm}.svg` | mono SVG, used in Trust Strip |
| Doc thumbs              | `/public/documents/{nib,npwp,factory-audit,coa,iso-9001}.jpg` | 600×800 portrait |

PDFs (NIB, NPWP, factory audit report, COA, ISO 9001 certificate)
should drop into `/public/documents/` with the matching filenames so
the homepage About block links open correctly without code changes.
