# Test task for Front-end Developer position in Cupcake Development

**Task description:** [API Repository](https://github.com/cupcakedev/cupcake-frontend-test-task)

**Tech stack:** React, JavaScript, API, Webpack

**Application start:** After downloading this repo run command `npm i` to install dependencies. After that you need run server from the API repo mentioned above. After that API will be available on PORT 3000. Then start this app using `npm start`, that all. Or you can access deployed version [here](https://iluxmas.github.io/test_task_230123_/) (API server still need to be launched)

**Features:**

- Exchange rates received from three sources using long polling connection
- Highlighting of most profitable value for exchange pair

Bundling was made with Webpack

**Things to improve:**

- [ ] Display API availability status
- [ ] Add last update time for sources
- [ ] Refactor processing data function to make it calculate and update only newly received data, would be better in case of data scale-up
