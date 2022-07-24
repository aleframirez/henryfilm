const server =require("../../App.js")
const {conn} = require("../DB/db.js")

const PORT = 3001

conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    });
  });
  
