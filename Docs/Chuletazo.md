# Chuletario Git – main y ramas `*-dev`

## 0) Requisitos rápidos
```bash
git status                 # ve tu estado
git add .                  # agrega cambios
git commit -m "mensaje"    # crea el commit ej: en "mensaje" colocar "ADD: creación de la pantalla 2"
```

---

## 1) Subir **a main**
```bash
git checkout main
git pull --rebase origin main    # trae lo último de GitHub
git push -u origin main             # sube tus commits
```

---

## 2) Subir **a tu rama** `cata-dev`
```bash
# crearla la primera vez (si no existe en remoto)
git checkout -b cata-dev
git push -u origin cata-dev

# las siguientes veces
git checkout cata-dev
git pull --rebase origin cata-dev
git push
```

## 3) Subir **a tu rama** `vicente-dev`
```bash
git checkout -b vicente-dev     # solo la 1ª vez
git push -u origin vicente-dev

# luego:
git checkout vicente-dev
git pull --rebase origin vicente-dev
git push
```

## 3) Subir **a tu rama** `christian-dev`
```bash
git checkout -b christian-dev   # solo la 1ª vez
git push -u origin christian-dev

# luego:
git checkout christian-dev
git pull --rebase origin christian-dev
git push
```

---

## 4) Mantener tu rama `*-dev` **al día con main**
```bash
git checkout x-dev             # o la rama que uses
git fetch origin main
git rebase origin/main            # re-aplica tus commits encima de main
# si hubo conflictos: arréglalos, luego
git add .
git commit -m "mensaje"
git push -u origin main


-------
git rebase --continue
git push --force-with-lease       # actualiza tu rama en remoto de forma segura
```

---