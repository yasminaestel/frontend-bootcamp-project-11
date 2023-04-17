develop:
	npx webpack serve

install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

build:
	NODE_ENV=production npx webpack
