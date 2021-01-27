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

// Find the menu selected and update child menu order
function updateMenu(req, res) {
    let menuData = req.body;
    const menuSelected = req.params.id;

    Menu.findByIdAndUpdate(
        {
            _id: menuSelected,
        },
        {
            $set: { "items.$[el].order": menuData.order },
        },
        {
            arrayFilters: [
                {
                    "el._id": menuData._id,
                },
            ],
            new: true,
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
// Find the menu selected and update child menu active value
function activateMenu(req, res) {
    const { id, active } = req.body;
    const menuSelected = req.params.id;

    Menu.findByIdAndUpdate(
        {
            _id: menuSelected,
        },
        {
            $set: { "items.$[el].active": active }
        },
        {
            arrayFilters: [
                {
                    "el._id": id
                }
            ],
            new: true
        },
        (err, menuUpdated) => {
            if (err) {
                res.status(500).send({
                    message: "Server error finding and updating menu (menu.js)",
                });
            } else {
                if (!menuUpdated) {
                    res.status(404).send({
                        message: "Can't find the menu to update (menu.js)",
                    });
                } else {
                    if (active) {
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
        });

}


module.exports = {
  addMenu,
  getMenus,
  updateMenu,
  activateMenu,
};