const {
	Barcode
} = require("../models");

module.exports = {
	create(inputData) {
		return Barcode.create(inputData);
	},

	update(id, updateData) {
		return Barcode.update(updateData, {
			where: {
				id
			}
		});
	},

	delete(id) {
		return Barcode.destroy({
			where: {
				id
			}
		});
	},

	deleteAll(){
		Barcode.destroy({
			where: {},
			truncate: true,
			restartIdentity: true
		})
	},
  
	find(id) {
		return Barcode.findByPk(id);
	},

	findAll(queue) {
		return Barcode.findAll(queue);
	},

	findOne(key) {
		return Barcode.findOne(key);
	},

	getTotalQRcode() {
		return Barcode.count();
	},
};