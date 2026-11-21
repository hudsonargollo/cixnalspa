# Cix Nail Artist — Image Prompt System

Prompt system for generating the service images used on the booking page
(`/agendar`) and in marketing assets. Every image shares one locked style
block, so the set reads as one salon: same hand model, same light, same paper,
same grade.

The 15 prompts in section 2 are complete and self-contained — style locked in,
negative prompt appended. Copy each one verbatim into the generator; nothing to
assemble.

---

## 1. Style lock (identical in all 15 prompts)

Change these once here and regenerate the set; do not edit them per image.

| Token | Locked value |
|-------|--------------|
| Genre | editorial beauty photograph for a premium nail salon service card |
| Subject | warm beige skin, one consistent hand model across the set |
| Shot | close-up, shallow depth of field |
| Lighting | soft window light from the upper left, warm neutral grade |
| Palette | cream cardstock, warm beige skin, muted rosewood `#A65A4C` accents, copper `#A65A4C` foil detail |
| Background | plain warm cream seamless paper `#E5DACC` |
| Finish | glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect |
| Style | high-end salon Instagram editorial, photorealistic |
| Aspect ratio | `4:5` (service cards) · colour space `sRGB` |
| Output | WebP, quality 82–88, max width 1080 px, under ~120 KB |

Props allowed (at most one per image): `nothing`, `a sprig of dried eucalyptus`,
`a folded cream linen cloth`, `a small copper dish`.

### Negative prompt (appended to all 15, verbatim)

```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

## 2. The 15 prompts (ready to paste)

Service ids come from `seedCixCatalog()` in `main/db.ts`. Each `prompt_key` is
also the output file name: `frontend/public/cixnails/services/<prompt_key>.webp`.

---

### Destacados (highlights)

#### 1. cix-prod-01 · Manicura Gel

**prompt_key:** `mani-gel-nude`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: solid nude-pink gel, high-gloss cured finish.
Shot: close-up, top-down on the paper, hand and fingernails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), nothing behind the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 2. cix-prod-02 · Pedicura Pedispa

**prompt_key:** `pedi-spa-linen`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: hand + bare foot.
Technique: solid nude-pink semi-permanent polish, relaxed spa finish.
Shot: close-up, three-quarter from the ankle, foot and toenails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen cloth under the foot.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 3. cix-prod-03 · Combo Manos y Pies

**prompt_key:** `combo-matching-rosewood`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: both hands + bare feet in one frame, hands at the top of the frame and feet at the bottom.
Technique: matching solid rosewood #A65A4C polish on fingernails and toenails.
Shot: close-up, top-down flat lay, centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a sprig of dried eucalyptus between the hands and feet.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 4. cix-prod-04 · Manicura Acrílica con Decoración

**prompt_key:** `mani-acrylic-floral-art`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: acrylic with hand-painted copper floral nail art and one copper chrome accent nail.
Shot: close-up, three-quarter from the wrist, hand and fingernails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a small copper dish beside the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

### Manicura

#### 5. cix-prod-05 · Manicura Tradicional

**prompt_key:** `mani-traditional-nude`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: classic solid nude traditional manicure, natural shine.
Shot: close-up, top-down on the paper, hand and fingernails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), nothing behind the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 6. cix-prod-06 · Manicura Acrílico

**prompt_key:** `mani-acrylic-french`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: acrylic, classic French tips, crisp white smile line.
Shot: close-up, three-quarter from the wrist, hand and fingernails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen cloth under the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 7. cix-prod-07 · Manicura Gel

**prompt_key:** `mani-gel-rose`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: gel, solid warm rose #C4897C.
Shot: close-up, top-down on the paper, hand and fingernails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), nothing behind the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 8. cix-prod-08 · Manicura Otros

**prompt_key:** `mani-others-lineart`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: minimal fine line art on a nude base, one accent nail.
Shot: close-up, side profile of the nails, hand centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a sprig of dried eucalyptus beside the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

### Pedicura

#### 9. cix-prod-09 · Pedicura Tradicional

**prompt_key:** `pedi-traditional-nude`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: bare foot.
Technique: classic solid nude traditional pedicure, natural shine.
Shot: close-up, three-quarter from the ankle, foot and toenails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), nothing behind the foot.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 10. cix-prod-10 · Pedicura Semipermanente

**prompt_key:** `pedi-semi-terracotta`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: bare foot.
Technique: semi-permanent solid terracotta #B4705F, high gloss.
Shot: close-up, top-down on the paper, foot and toenails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen cloth under the foot.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 11. cix-prod-11 · Pedicura Pedispa

**prompt_key:** `pedi-spa-nude`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: bare foot.
Technique: pedispa finish, solid nude-pink, relaxed spa pose.
Shot: close-up, three-quarter from the ankle, foot and toenails centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen cloth under the foot.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 12. cix-prod-12 · Pedicura Acripie

**prompt_key:** `pedi-acrylic-french`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: bare foot.
Technique: acrylic pedicure (acripie), classic French tips on the toes.
Shot: close-up, side profile of the toenails, foot centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a small copper dish beside the foot.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

### Combos

#### 13. cix-prod-13 · Combo Manicura + Pedicura Tradicionales

**prompt_key:** `combo-traditional-nude`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: both hands + bare feet in one frame, hands at the top of the frame and feet at the bottom.
Technique: matching classic solid nude traditional manicure and pedicure, natural shine.
Shot: close-up, top-down flat lay, centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a sprig of dried eucalyptus between the hands and feet.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 14. cix-prod-14 · Combo Gel + Pedispa

**prompt_key:** `combo-gel-pedispa`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: both hands + bare feet in one frame, hands at the top of the frame and feet at the bottom.
Technique: gel on the hands and pedispa finish on the feet, both solid rosewood #A65A4C.
Shot: close-up, top-down flat lay, centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen cloth under the hands and feet.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

#### 15. cix-prod-15 · Combo Acrílico + Acripie

**prompt_key:** `combo-acrylic-acripie`

**Positive:**
```
Editorial beauty photograph for a premium nail salon service card.
Subject: both hands + bare feet in one frame, hands at the top of the frame and feet at the bottom.
Technique: acrylic on the hands and acrylic pedicure (acripie) on the feet, hand-painted copper floral nail art with one copper chrome accent nail on each.
Shot: close-up, top-down flat lay, centred, shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents, copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a small copper dish beside the hands.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

**Negative:**
```
text, watermark, logo, brand name, hands with extra fingers, fused fingers, crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast, cluttered background, other people, face, feet with distorted toes
```

---

## 3. Where the images go

| Asset | Path | Ratio |
|-------|------|-------|
| Service card image | `frontend/public/cixnails/services/<prompt_key>.webp` | 4:5 |
| Category tile | `frontend/public/cixnails/services/cat-<key>.webp` | 1:1 |
| Hero / slideshow | `frontend/public/cixnails/work-*.webp` | 3:4 |
| Salon atmosphere | `frontend/public/cixnails/shop-*.webp` | 4:5 |

Export settings: WebP, quality 82–88, sRGB, max width 1080 px, under ~120 KB
each. Name the file exactly its `prompt_key` — `products.image_key` already
resolves to `/cixnails/services/<image_key>.webp`, so no mapping table is
needed. Placeholder tiles for all 15 keys are committed in that directory;
dropping a real file over one replaces it with no code change.

---

## 4. Binding (already wired)

1. `products.image_key` — column in the seed schema plus a guarded `ALTER TABLE`
   in `runMigrations()`, so existing installs self-heal on restart.
2. `seedServiceImageKeys()` in `main/db.ts` fills all 15 keys with `UPDATE`
   (never overwrites a key set by hand).
3. `GET /api/public/booking/config` returns `image` per service (null when unset).
4. `highlight-card.tsx` prefers `service.image` over the category icon, then
   `HIGHLIGHT_IMAGES`, then `SLIDESHOW_PHOTOS`; `service-card.tsx` uses it as
   the circular avatar.

To point a service at a different image, set `image_key` on that product.
