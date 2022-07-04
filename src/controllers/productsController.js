// fs requerido para JSON
const fs = require('fs');
const path = require('path');

// para hacer lectura correcta del... 'productsDataBase.json'
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products', { 
			products: products
		});
	},

	detailApiAll: (req, res) => {
		// Do the magic
		res.status(201).send(products); 
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
        const productId = parseInt(req.params.id, 10);
        let productDetail; 

        for (let i = 0; i < products.length; i++) {
            if ( products[i].id === productId ) {
                // acá lo encontramos al producto
                productDetail = products[i];
            }
        }

		
        // si existe...
        if (productDetail){
            res.render( "detail",  {productDetail: productDetail} );
		}
		// si no hay producto...
        else {
			res.status(404).render( "error",  {
				message: 'Producto no encontrado',
			} );
        }



	},


	// Detail - Detail from one product
	detailApi: (req, res) => {
		// Do the magic
        const productId = parseInt(req.params.id, 10);
        let productDetail; 

        for (let i = 0; i < products.length; i++) {
            if ( products[i].id === productId ) {
                // acá lo encontramos al producto
                productDetail = products[i];
            }
        }

		
        // si existe...
        if (productDetail){
			res.status(201).send(productDetail); 
		}
		// si no hay producto...
        else {
			res.status(404).render( "error",  {
				message: 'Producto no encontrado',
			} );
        }



	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form', { 
			products: products
		});
	},
	
	// Create -  Method to store
	store: (req, res) => {
		
		// Do the magic
		let nuevoProducto = {
			id: products.length + 1,
			name: req.body.name,
			price: parseInt(req.body.price), 		// <= debe ser numero!
			discount: parseInt(req.body.discount),	// <= debe ser numero!
			category: req.body.category,
			description: req.body.description,
			image: 'default-image.png'
		}

		// anexamos el nuevo dato...
		products.push(nuevoProducto);

		// JSON STRINGIFY...
		productsJson = JSON.stringify(products);

		// escribimos nuevamente el archivo
		fs.writeFileSync(productsFilePath, productsJson);

		res.redirect('products');
		/* res.redirect('products'); */

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
        const productId = parseInt(req.params.id, 10);
        let productDetail; 

        for (let i = 0; i < products.length; i++) {
            if ( products[i].id === productId ) {
                // acá lo encontramos al producto
                productDetail = products[i];
            }
        }

		res.render('product-edit-form', { 
			productDetail: productDetail
		});

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		res.status(201).send(req.body); 

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
		// Do the magic
		const productId = parseInt(req.params.id, 10);
	
		for (let i = 0; i < products.length; i++) {
			if ( products[i].id === productId ) {
				products.splice(i, 1)
			}
		}

		res.send(`se ha borrado el producto con id ${productId}`);
		
	}
};

module.exports = controller;