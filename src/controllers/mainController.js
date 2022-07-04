const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	index: (req, res) => {

		// array de 'visited'
		const visited = products.filter((product)=> {
			return product.category === 'visited';
		});

		// array de 'in-sale'
		const sale = products.filter((product)=> {
			return product.category === 'in-sale';
		});

		res.render('index', { 
			visited: visited,
			sale: sale 
		});
		
	},

	search: (req, res) => {
		// let name = req.query.name;
		// products.forEach(product) => {
		// 	console.log(product);
		// });

		let buscado = req.query.keywords.toLowerCase();

		let resultados = [];

		for (let i = 0; i < products.length; i++) {
            if ( (products[i].name.toLowerCase()).includes(buscado) ) {
                // acá lo encontramos al producto
                resultados.push( products[i] );
            }
        }

 		res.render('results', { 
			productDetail: resultados
		});


		
	},
};

module.exports = controller;
