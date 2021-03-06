const invitationModel = require("./src/models/invitation.model");

(async function (port, callback) {
  const { join } = require("path");
  const express = require("express");
  const mongoose = require("mongoose");
  const morgan = require("morgan");
  const cors = require("cors");
  const debug = require("debug")("server");
  const debug_database = require("debug")("mongoDB");
  const multer = require("multer");
  const app = express();

  const PORT = port || process.env.PORT || 8080;
  const appName = process.env.APP_NAME || "Indulge Backend";
  const api = process.env.API_RELATIVE || "/api/v1";
  const dbUrl =
    process.env.DB_URL || "mongodb://localhost:27017/indulge-backend-1";

  mongoose.connect(dbUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    debug_database("Database connected");
  });

  const storage=multer.diskStorage({
    destination: function(request, file, callback){
      callback(null, './public');
    },
    filename:function(request, file, callback){
      callback(null, file.originalname+Date.now());
    }
  })

  const upload=multer({
    storage, 
    limits :{
      fieldSize: 1024*1024*20
    }
  })
  app.use(express.static(join(__dirname, 'public')));

  
  debug("Booting %s", appName);
  app.set('view engine', 'ejs');
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(morgan("dev"));

  app.use(`${api}`, require("./src/routes/index"));

  app.listen(PORT, () => debug("Server is running at %s", PORT));
})();
