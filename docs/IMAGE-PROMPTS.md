# Cix Nail Artist — Image Prompt System

Prompt system for generating the service images used on the booking page
(`/agendar`) and in marketing assets. Every image is derived from one master
prompt, so the set stays visually coherent: same hand model, same light, same
paper, same grade.

---

## 1. Master prompt (base)

Copy this block into the `prompt` field and fill the `{...}` slots.

```
Editorial beauty photograph for a premium nail salon service card.
Subject: {SUBJECT}.
Technique: {TECHNIQUE}.
Shot: close-up, {ANGLE}, hand and {HAND_PART} centred, shallow depth of
field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents,
copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), no props behind the
hand except {PROP}.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no
smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no
watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: {RATIO}. Colour space: sRGB.
```

Standard slots:

| Slot | Values |
|------|--------|
| `{SUBJECT}` | `single hand`, `both hands`, `hand + bare foot` (combos/pedicure) |
| `{TECHNIQUE}` | `solid nude polish`, `classic French tips`, `hand-painted floral nail art`, `copper chrome accent`, `minimal line art` |
| `{ANGLE}` | `top-down on the paper`, `three-quarter from the wrist`, `side profile of the nails` |
| `{HAND_PART}` | `fingernails`, `toenails` |
| `{PROP}` | `nothing`, `a sprig of dried eucalyptus`, `a folded cream linen cloth`, `a small copper dish` |
| `{RATIO}` | `4:5` (cards), `3:4` (portrait cards), `1:1` (grid) |

Negative prompt (always append):

```
text, watermark, logo, brand name, hands with extra fingers, fused fingers,
crooked nails, chipped polish, dirty cuticles, harsh flash, cool blue cast,
cluttered background, other people, face, feet with distorted toes
```

---

## 2. Per-service prompts

The service list is seeded in `main/db.ts` (`seedCixCatalog()`). The `prompt_key`
below is the stable identifier to store on the service record — it is also the
output file name (`<prompt_key>.webp`).

Two slots vary per service: `{TECHNIQUE}` (what is on the nails) and `{POSE}`
(subject + prop + angle). Everything else comes from the master block verbatim.

### Destacados (highlights)

#### cix-prod-01 · Manicura Gel — `mani-gel-nude`
- **TECHNIQUE:** solid nude-pink gel, high-gloss cured finish
- **POSE:** single hand, top-down on the paper, fingernails centred, no prop

#### cix-prod-02 · Pedicura Pedispa — `pedi-spa-linen`
- **TECHNIQUE:** solid nude-pink semi-permanent polish, relaxed spa finish
- **POSE:** hand + bare foot, three-quarter from the ankle, folded cream linen
  cloth under the foot

#### cix-prod-03 · Combo Manos y Pies — `combo-matching-rosewood`
- **TECHNIQUE:** matching solid rosewood `#A65A4C` on fingernails and toenails
- **POSE:** both hands + bare feet, top-down flat lay (hands top, feet bottom),
  sprig of dried eucalyptus between them

#### cix-prod-04 · Manicura Acrílica con Decoración — `mani-acrylic-floral-art`
- **TECHNIQUE:** acrylic with hand-painted copper floral art + one chrome accent nail
- **POSE:** single hand, three-quarter from the wrist, small copper dish

### Manicura

#### cix-prod-05 · Manicura Tradicional — `mani-traditional-nude`
- **TECHNIQUE:** classic solid nude traditional manicure, natural shine
- **POSE:** single hand, top-down on the paper, no prop

#### cix-prod-06 · Manicura Acrílico — `mani-acrylic-french`
- **TECHNIQUE:** acrylic, classic French tips, crisp white smile line
- **POSE:** single hand, three-quarter from the wrist, folded cream linen cloth

#### cix-prod-07 · Manicura Gel — `mani-gel-rose`
- **TECHNIQUE:** gel, solid warm rose `#C4897C`
- **POSE:** single hand, top-down on the paper, no prop

#### cix-prod-08 · Manicura Otros — `mani-others-lineart`
- **TECHNIQUE:** minimal fine line art on a nude base, one accent nail
- **POSE:** single hand, side profile of the nails, sprig of dried eucalyptus

### Pedicura

#### cix-prod-09 · Pedicura Tradicional — `pedi-traditional-nude`
- **TECHNIQUE:** classic solid nude traditional pedicure
- **POSE:** bare foot, three-quarter from the ankle, no prop

#### cix-prod-10 · Pedicura Semipermanente — `pedi-semi-terracotta`
- **TECHNIQUE:** semi-permanent solid terracotta `#B4705F`, high gloss
- **POSE:** bare foot, top-down on the paper, folded cream linen cloth

#### cix-prod-11 · Pedicura Pedispa — `pedi-spa-nude`
- **TECHNIQUE:** pedispa finish, solid nude-pink
- **POSE:** bare foot, three-quarter from the ankle, folded cream linen cloth

#### cix-prod-12 · Pedicura Acripie — `pedi-acrylic-french`
- **TECHNIQUE:** acrylic pedicure (acripie), classic French tips on the toes
- **POSE:** bare foot, side profile of the toenails, small copper dish

### Combos

#### cix-prod-13 · Combo Manicura + Pedicura Tradicionales — `combo-traditional-nude`
- **TECHNIQUE:** matching classic solid nude on fingernails and toenails
- **POSE:** both hands + bare feet, top-down flat lay, sprig of dried eucalyptus

#### cix-prod-14 · Combo Gel + Pedispa — `combo-gel-pedispa`
- **TECHNIQUE:** gel on the hands, pedispa finish on the feet, both solid
  rosewood `#A65A4C`
- **POSE:** both hands + bare feet, top-down flat lay, folded cream linen cloth

#### cix-prod-15 · Combo Acrílico + Acripie — `combo-acrylic-acripie`
- **TECHNIQUE:** acrylic on the hands and acripie on the feet, hand-painted
  copper floral art + one chrome accent nail each
- **POSE:** both hands + bare feet, top-down flat lay, small copper dish

### Filled example (cix-prod-06)

```
Editorial beauty photograph for a premium nail salon service card.
Subject: single hand.
Technique: acrylic, classic French tips, crisp white smile line.
Shot: close-up, three-quarter from the wrist, hand and fingernails centred,
shallow depth of field, soft window light from the upper left, warm neutral grade.
Palette: cream cardstock, warm beige skin, muted rosewood #A65A4C accents,
copper #A65A4C foil detail.
Background: plain warm cream seamless paper (#E5DACC), a folded cream linen
cloth under the hand.
Finish: glossy cured gel/acrylic surface, crisp cuticle line, no chips, no
smudges, salon-perfect.
Style: high-end salon Instagram editorial, photorealistic, no text, no
watermark, no logo, no extra fingers, no distorted nails.
Aspect ratio: 4:5. Colour space: sRGB.
```

---

## 3. Shared style tokens

Keep these constant across the whole set — they are what makes 15 images read as
one salon.

| Token | Value |
|-------|-------|
| Background paper | warm cream seamless, `#E5DACC` |
| Brand accent | rosewood / copper `#A65A4C` |
| Secondary tones | `#C4897C`, `#B4705F`, `#8E4E43` |
| Lighting | soft window light, upper left, warm neutral grade |
| Depth | shallow (f/1.8–2.8 equivalent), hand sharp, paper soft |
| Finish | cured high-gloss, salon-perfect, no chips |
| Hand model | one consistent model across the set; warm beige skin |
| Forbidden | text, watermark, logo, extra/distorted fingers, cool blue cast, clutter |

---

## 4. Where the images go

| Asset | Path | Ratio |
|-------|------|-------|
| Service card image | `frontend/public/cixnails/services/<prompt_key>.webp` | 4:5 |
| Category tile | `frontend/public/cixnails/services/cat-<key>.webp` | 1:1 |
| Hero / slideshow | `frontend/public/cixnails/work-*.webp` | 3:4 |
| Salon atmosphere | `frontend/public/cixnails/shop-*.webp` | 4:5 |

Export settings: WebP, quality 82–88, sRGB, max width 1080 px, under ~120 KB
each. Name the file exactly the `prompt_key` so the service record can resolve
it without a mapping table.

## 5. Binding a prompt to a service

`products` currently has no image column. To wire the generated files in:

1. `ALTER TABLE products ADD COLUMN image_key TEXT;` (guarded — see the
   `addColumnIfMissing` helper in `main/db.ts`).
2. `UPDATE products SET image_key = '<prompt_key>' WHERE id = '<product id>';`
3. Return it from `GET /api/public/booking/config` as `image` per service.
4. Render it in `frontend/src/components/booking/service-card.tsx` with a
   fallback to `iconUrl()` when `image` is null.

Seed values are in the table above; keep `prompt_key` as the single source of
truth for both the prompt and the file name.
