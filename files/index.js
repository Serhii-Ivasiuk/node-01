const fs = require('fs/promises');
const path = require('path');

// console.log(__dirname);
// console.log(path.join());
// console.log(path.resolve());

const usersPath = path.join(__dirname, '..', 'db', 'users.json');

class FileOperations {
	constructor(path) {
		this.path = path;
	}

	create = async data => {
		return await fs.writeFile(this.path, JSON.stringify(data, null, 2));
	};

	read = async () => {
		return await fs.readFile(this.path, 'utf-8');
	};

	display = async () => {
		const users = await this.read();
		console.log(users);
	};

	update = async newUser => {
		const users = JSON.parse(await this.read());
		users.push(newUser);
		return await this.create(users);
	};

	remove = async () => {
		return await fs.unlink(this.path);
	};

	updateOne = async updatedUser => {
		const users = JSON.parse(await this.read());
		const updated = users.map(item => {
			if (item.id === updatedUser.id) {
				item.name = updatedUser.name;
			}
			return item;
		});
		return await this.create(updated);
	};

	removeOne = async id => {
		const users = JSON.parse(await this.read());
		const idx = users.findIndex(item => item.id === String(id));
		if (idx === -1) {
			console.log('index not find');
			return false;
		}
		users.splice(idx, 1);
		return await this.create(users);
	};
}

const file = new FileOperations(usersPath);

const users = [
	{
		id: '1',
		name: 'serhii',
	},
	{
		id: '2',
		name: 'yana',
	},
	{
		id: '3',
		name: 'ihor',
	},
];

// file.create(users);
// file.display();
// file.update({
// 	id: '4',
// 	name: 'andrii',
// });
// file.remove();
// file.updateOne({
// 	id: '2',
// 	name: 'yana babak',
// });
file.removeOne(6);

async function errorHandler(clb, data) {
	try {
		if (data) {
			await clb(data);
		} else {
			await clb();
		}
	} catch (error) {
		console.log('error.message:', error.message);
	}
}

// errorHandler(file.display.bind(file));
// errorHandler(file.display);
// errorHandler(file.create, users);
