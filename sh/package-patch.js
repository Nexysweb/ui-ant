git pull origin master
yarn install
yarn test
yarn build
npm version patch
npm publish

// build the storybook
yarn buildStorybook
git add -A 
git commit -a -m "built storybook"

git push origin master
