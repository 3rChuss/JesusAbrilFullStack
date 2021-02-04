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

// Find and update the item a the menu selected
function editItemMenu(req, res) {
    let menuData = req.body;
    const menuSelected = req.params.id;

    Menu.findByIdAndUpdate(menuSelected,
    {
        $set: { "items.$[el]": menuData }
    }, {
        arrayFilters: [{ "el._id": menuData._id }],
        new: true
    }, (err, menuUpdated) => {
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
    })
}

// Add Item to menu selected
function addItemtoMenu(req, res) {
    let menuData = req.body;
    const menuSelected = req.params.id;

    Menu.findByIdAndUpdate(menuSelected,
        {
            $push: { "items": menuData }
        }, {
        new: true,
    }, (err, itemAdded) => {
        if (err) {
            res.status(500).send({
                message: "Server error finding and updatind the menu"
            });
        } else {
            if (!itemAdded) {
                res.status(404).send({
                    message: "Can't find the menu to add the item"
                });
            } else {
                res.status(200).send({
                    message: "Item added successfully! 🤙",
                });
            }
        }
    })
};

// Find menu selected and update child menu active value
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

// Find menu selected and delete item
function deleteItemMenu(req, res) {
    const { _id } = req.body;
    const menuSelected = req.params.id;

    Menu.findByIdAndUpdate(menuSelected,
        {
            $pull: {
                "items": { _id: _id }
            }
        }, {
            safe: true,
            upsert:true
    }, (err, itemDeleted) => {
            if (err) {
              res.status(500).send({
                message: "Server error finding and updating menu (menu.js)",
              });
            } else {
                if (!itemDeleted) {
                    res.status(404).send({
                        message: "Can't find the menu to update (menu.js)",
                    });
                } else {
                    res
                        .status(200)
                        .send({ message: "Menu deleted successfully! 🤙" });
                }
            }
        }
    )
}

// Find the parent menu and delete all data
function deleteMenu(req, res) {
    const { _id } = req.params;

    Menu.findByIdAndRemove(_id, (err, menuDeleted) => {
        if (err) {
            res.status(500).send({
                message: "Error: Menu not found!"
            })
        } else {
            if (!menuDeleted) {
                res.status(404).send({
                  message: "Can't delete the menu selected. 😒",
                });
            } else {
                res.status(200).send({
                    message: "Menu deleted correctly. 👍"
                })
            }
        }
    })
}


module.exports = {
    addMenu,
    getMenus,
    updateMenu,
    activateMenu,
    addItemtoMenu,
    editItemMenu,
    deleteItemMenu,
    deleteMenu,
};