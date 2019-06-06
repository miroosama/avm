rsync -r client/src/ docs/
rsync -r client/public/ docs/
git add .
git commit -m"Compiled for GP"
git push
