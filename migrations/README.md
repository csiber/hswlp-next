# Migrációs rendszer

Ez a mappa két al-könyvtárat tartalmaz:

- `global/` – a közös HSWLP táblák migrációi. Ezeket mindig a `hswlp-d1` adatbázisra kell futtatni.
- `local/` – projekt-specifikus táblák migrációi. Ezek az adott alkalmazás saját D1 adatbázisába kerülnek.

Migráció generálása:

```bash
pnpm next:make:migration local add_posts_table
pnpm next:make:migration global add_user_flag
```

A script ellenőrzi, hogy a globális táblák nem kerülnek véletlenül a `local/` mappába. Ha mégis, hibával leáll.

Migráció futtatása:

```bash
pnpm next:migrate:local   # csak a local migrációk
pnpm next:migrate:global  # csak a global migrációk
```
