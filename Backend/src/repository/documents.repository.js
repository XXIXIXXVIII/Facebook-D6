/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
const db = require("../services/db.service");

async function updateDocument(payload) {
  try {
    const documents = await db("documents")
      .where({
        user_id: payload.user_id,
        ownership_object: payload.ownership_object,
        document_type: payload.document_type,
        video_flag: 1,
      })
      .select("id");

    const result = await db.transaction(async (trx) => {
      let update;
      if (documents.length > 0) {
        update = await trx("documents")
          .where({
            id: documents[0].id,
          })
          .update(payload);
      } else {
        update = await trx("documents").insert(payload);
      }

      if (update) {
        return true;
      } else {
        return false;
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  updateDocument,
};
