// Importing express in our app

import Routes from "./App/Config/Routes.js";

Routes(app => {
     app.listen(3000, () => console.log("Server Up And Running. Listening On Port 3000"));
});