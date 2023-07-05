const {
	Registrations
} = require("../models");

module.exports = {
	create(inputData) {
		return Registrations.create(inputData);
	},

	update(id, updateData) {
		return Registrations.update(updateData, {
			where: {
				id
			}
		});
	},

	delete(id) {
		return Registrations.destroy({
			where: {
				id
			}
		});
	},

	deleteAll(){
		Registrations.destroy({
			where: {},
			truncate: true,
			restartIdentity: true
		})
	},
  
	find(id) {
		return Registrations.findByPk(id);
	},

	findAll(queue) {
		return Registrations.findAll(queue);
	},

	findOne(key) {
		return Registrations.findOne(key);
	},

	getTotalRegistrations() {
		return Registrations.count();
	},
};