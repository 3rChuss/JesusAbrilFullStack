const Menu = require('../models/menu');

function addMenu(req, res) {
    const { title, menuData } = req.body;
    const menu = new Menu({
        title,
        menu: menuData
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
        .exec((err, menuStored) => {
            if (err) {
                res.status(500).send({ message: 'Server Error' })
            } else {
                if (!menuStored) {
                    res.status(404).send({ message: 'Menu not found.' })
                } else {
                    res.status(200).send({ menu: menuStored });
                }
            }
        });
}

function updateMenu(req, res) {
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Server error while updating the menu' });
        } else {
            if (!menuUpdated) {
                res.status(404).send({ message: "Menu can't be find" });
            } else {
                res.status(200).send({ message: 'Menu updated successfully' });
            }
        }
    });
}


module.exports = {
  addMenu,
  getMenus,
  updateMenu,
};