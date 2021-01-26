const Menu = require('../models/menu');

function addMenu(req, res) {
    const { title } = req.body;
    const menu = new Menu({
        title,
        items: new Array()
    });

    menu.save((err, createdMenu) => {
        if (err) {
            res.status(500).send({ message: 'Server Error' });
        } else {
            if (!createdMenu) {
                res.status(404).send({ message: 'Error while creating new menu' });
            } else {
                res.status(200).send({ message: 'Menu created successfully.' });
            }
        }
    })
}

function getMenus(req, res) {
    Menu.find()
        .sort({'menu.order': "asc" })
        .exec((err, menusStored) => {
            if (err) {
                res.status(500).send({ message: 'Server Error' })
            } else {
                if (!menusStored) {
                    res.status(404).send({ message: 'Menu not found.' })
                } else {
                    res.status(200).send({ menus: menusStored });
                }
            }
        });
}

// Find the menu selected and update child menu
function updateMenu(req, res) {
    let menuData = req.body;
    const params = req.params;

    let { order } = menuData;
    console.log(req.body);

    Menu.findByIdAndUpdate(
        params.id, menuData._id,
        {
            $set: { "items.$.order": order }
        },
        (err, menuUpdated) => {
            if (err) {
                res.status(500).send({
                    message: "Server error finding and updating menu (menu.js)",
                });
            } else {
                if (!menuUpdated) {
                    res
                        .status(404)
                        .send({ message: "Can't find the menu to update (menu.js)" });
                } else {
                    res.status(200).send({ message: "Menu updated successfully! 🤙" });
                }
            }
        }
    );
}


function activateMenu(req, res) {

    const { id, active } = req.body;

    Menu.findByIdAndUpdate(req.params.id, id, { active }, (err, menuUpdated) => {
        if (err) {
            res.status(500).send({
                message:
                    "Server error finding and updating menu (menu.js)",
            });
        } else {
            if (!menuUpdated) {
                res
                    .status(404)
                    .send({
                        message: "Can't find the menu to update (menu.js)",
                    });
            } else {
                if (active === true) {
                    res
                        .status(200)
                        .send({ message: "Menu activated successfully! 🤙" });
                } else {
                    res
                      .status(200)
                      .send({ message: "Menu disabled successfully! 🤙" });
                }
            }
        }
    })
}


module.exports = {
  addMenu,
  getMenus,
  updateMenu,
  activateMenu,
};