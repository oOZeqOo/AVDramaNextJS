start:
	open http://localhost:3000
	npm run dev

rename:
	python scripts/rename_files.py

update:
	git add ./public/
	git commit -am "CLI Update"
	git push

add-pics:
	git add ./public/
	git commit -m "added new pics"

check:
	echo "Do:"
	echo  "- make check-mistakes"
	echo  "- make check-images"
	

check-mistakes:
	python scripts/find_mistakes.py
	

compare-images:
	python scripts/compare_images.py
	

commit:
	git commit -am "Update"
	

push:
	git push
	

