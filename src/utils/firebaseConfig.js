const admin = require("firebase-admin");
const serviceAccount = require("../config/path-to-service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "compliants-anouncements-web.appspot.com",
});

const bucket = admin.storage().bucket();

async function uploadImageToFirebase(file, fileName) {
  try {
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    stream.on("error", (err) => {
      console.error("Error al subir la imagen a Firebase:", err);
      throw err;
    });

    stream.on("finish", async () => {
      await fileUpload.makePublic();
    });

    stream.end(file.buffer);

    return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
  } catch (error) {
    console.error("Error al subir la imagen a Firebase:", error);
    throw error;
  }
}

module.exports = {
  uploadImageToFirebase,
};
