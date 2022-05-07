const levels = require("../models/Profile.js");

class LevelManager {


static async add(user, xp) {

var userDB = await levels.findOne({ userID: user.id})

if (!userDB) {

userDB = new levels({
  userID: user.id,
  xp: xp,
  level: Math.floor(0.1 * Math.sqrt(xp)) 
})

await userDB.save().catch(x => console.error(x))
return (Math.floor(0.1 * Math.sqrt(xp)) > 0);

}

   userDB.xp += parseInt(xp, 10);
    userDB.level = Math.floor(0.1 * Math.sqrt(user.xp));

    await userDB.save().catch(e => console.log(`Fallo al agregar ${e}`) );

    return (Math.floor(0.1 * Math.sqrt(userDB.xp -= xp)) < userDB.level);

}

static async fetch(user) {

      const d = await levels.findOne({
      userID: user.id,
    });
    if (!d) return false;
    return d;
}

}

module.exports = LevelManager;