const Menu = require('../models/menu');

function addMenu(req, res) {
    const { title, items} = req.body;
    const menu = new Menu({
        title,
        items
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

function updateMenu(req, res) {
    let menuData = req.body;
    const params = req.params;

    Menu.findByIdAndUpdate(
      params.id,
      { menu: menuData },
      { new: true, upsert: true },
      (err, menuUpdated) => {
        console.log(menuUpdated);
        if (err) {
          res
            .status(500)
            .send({ message: "Server error while updating the menu" });
        } else {
          if (!menuUpdated) {
            res.status(404).send({ message: "Menu can't be find" });
          } else {
            res.status(200).send({ message: "Menu updated successfully" });
          }
        }
      }
    );
}


module.exports = {
  addMenu,
  getMenus,
  updateMenu,
};