const express = require("express");
const fs = require("fs");
const datafile = "server/data/clothing.json";
const router = express.Router();

module.exports = function (monitor) {
  let dataMonitor = monitor;

  dataMonitor.on("dataAdded", (itemName) => {
    // set immediate will make it execute before other eventlistener if they were declared later
    setImmediate(
      console.log("New item has been added with the name: ", itemName)
    );
  });

  /* GET all clothing */
  //#region clbk get
  /*
router.route("/").get(function (req, res) {
  getClothingData((err, data) => {
    if (err) return console.error(err);
    res.send(data);
  });
  
});

function getClothingData(clbk) {
  fs.readFile(datafile, "utf8", (err, data) => {
    if (err) return clbk(err, null);
    return clbk(null, JSON.parse(data));
  });
}
*/
  //#endregion

  //#region promise geClothing
  /*
router.route("/").get(function (req, res) {
  getClothingData()
    .then((clothing) => {
      res.status(200).send(clothing);
    })
    .catch((err) => res.status(500).send(err))
    .finally(() => {
      console.log("clean up");
    });
});

const getClothingData = () => new Promise(getClothingDataPromise);
function getClothingDataPromise(resolve, reject) {
  fs.readFile(datafile, "utf8", (err, data) => {
    if (err) reject("err");
    resolve(JSON.parse(data));
  });
}
*/
  //#endregion

  //#region async await getClothing
  router.route("/").get(async function (req, res) {
    try {
      const clothing = await getClothingData();
      res.status(200).send(clothing);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  //#endregion

  router.route("/").post(async function (req, res) {
    try {
      let data = await getClothingData();

      let nextID = getNextAvailableID(data);

      let newClothingItem = {
        clothingID: nextID,
        itemName: req.body.itemName,
        price: req.body.price,
      };

      data.push(newClothingItem);

      await saveClothingData(data);

      dataMonitor.emit("dataAdded", newClothingItem.itemName);

      res.status(201).send(newClothingItem);
    } catch (error) {
      res.status(500).send(error);
    }
  });

  async function getClothingData() {
    const data = await fs.promises.readFile(datafile, "utf8");
    const clothing = JSON.parse(data);
    return clothing;
  }

  function getNextAvailableID(allClothingData) {
    let maxID = 0;

    allClothingData.forEach(function (element, index, array) {
      if (element.clothingID > maxID) {
        maxID = element.clothingID;
      }
    });
    return ++maxID;
  }

  function saveClothingData(data) {
    return fs.promises.writeFile(datafile, JSON.stringify(data, null, 4));
  }

  // in the end we still return the router
  return router;
};
