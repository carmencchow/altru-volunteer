import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

// const { initializeApp, cert } = require("firebase-admin/app");
// const { getAuth } = require("firebase-admin/auth");
// const serviceAccount = require("./src/serviceAccount.json");

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const auth = getAuth(app);

// const auth = getAuth(app);
// module.exports = auth;
