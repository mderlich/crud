// fs requerido para JSON
const fs = require('fs');
const path = require('path');
const { CLIENT_RENEG_LIMIT } = require('tls');


/* 
// De aqui se retiro y envio dentro de cada funcion porque sino no lo tomaba bien al .json
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
*/

const controller = {


	// Root - Show all products
	index: (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		// Do the magic
		res.render('products', { 
			products: products
		});
	},

	detailApiAll: (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// Do the magic
		res.status(201).send(products); 
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		// Do the magic
        let productId = parseInt(req.params.id);

		// busqueda en pocas lineas... (prod == producto)
		let productIndice = products.findIndex( prod => prod.id == productId );
		let productDetail = products[productIndice];

        // si existe...
        if (productDetail){
            res.render( "detail",  {productDetail: productDetail} );
		}
		// si no hay producto...
        else {
			res.status(404).render( "error",  {
				message: 'Producto no encontrado' + productDetail,
			} );
        }



	},


	// Detail - Detail from one product
	detailApi: (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// Do the magic
        const productId = parseInt(req.params.id);

		// busqueda en pocas lineas... (prod == producto)
		let productIndice = products.findIndex( prod => prod.id == productId );
		let productDetail = products[productIndice];

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

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// Do the magic
		res.render('product-create-form', { 
			products: products
		});
	},
	
	// Create -  Method to store
	store: (req, res) => {

		
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// Imagen (inicio) ----------------
		// chequeamos si la imagen fue cargada
		if(req.file){
			// 'filename' esta indicado como llega desde el multer en el ruteador de products...
			// filename: 'ximg-1657115263090',
			rutaFoto = req.file.filename;
		}
		// si no hay, ponemos una por default
		else{
			rutaFoto = 'default-image.png';
		}
		// imagen (fin) --------------------

		// Do the magic
		let nuevoProducto = {
			// para el id, buscamos el maximo valor y le sumamos 1
			id: Math.max(...products.map( e => e.id )) + 1,
			name: req.body.name,
			description: req.body.description,
			price: parseInt(req.body.price), 		// <= debe ser numero!
			discount: parseInt(req.body.discount),	// <= debe ser numero!
			category: req.body.category,
			image: rutaFoto			
		}

		// anexamos el nuevo dato...
		products.push(nuevoProducto);

		// JSON STRINGIFY...
		// las ultimas dos lineas son necesarias para que sea legible 'null, 4);'
		let productsGuardar = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,productsGuardar);
		res.redirect('/products');

	},

	// Update - Form to edit
	edit: (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

		// Do the magic
        const productId = parseInt(req.params.id);


		// busqueda en pocas lineas... (prod == producto)
		let productIndice = products.findIndex( prod => prod.id == productId );
		let productDetail = products[productIndice];


        // si existe...
        if (productDetail){
			// enviamos la vista con el producto encontrado
			res.render('product-edit-form', { 
				productDetail: productDetail
			});
		}
		// si no existe el producto, mandamos error...
        else {
			res.status(404).render( "error",  {
				message: 'Producto no encontrado',
			} );
        }



	},
	// Update - Method to update
	update: (req, res) => {

		
		// si queremos ver lo enviado por el formulario...
		// res.json(req.body) 

		
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


		// Imagen (inicio) ----------------
		// chequeamos si la imagen fue cargada
		if(req.file){
			// 'filename' esta indicado como llega desde el multer en el ruteador de products...
			// filename: 'ximg-1657115263090',
			rutaFoto = req.file.filename;
		}
		// si no hay, ponemos una por default
		else{
			rutaFoto = 'default-image.png';
		}
		// imagen (fin) --------------------


        const productId = parseInt(req.params.id);

		// busqueda en pocas lineas... (prod == producto)
		let productIndice = products.findIndex( prod => prod.id == productId );
		//let productDetail = products[productIndice];

		// ac?? lo encontramos al producto
		products[productIndice]['name'] = req.body.name;
		products[productIndice]['price'] = req.body.price;
		products[productIndice]['discount'] = req.body.discount;
		products[productIndice]['category'] = req.body.category;
		products[productIndice]['description'] = req.body.description;
		products[productIndice]['image'] = rutaFoto;
	

		// guardamos los datos...
		let productsGuardar = JSON.stringify(products,null,4);
		fs.writeFileSync(productsFilePath,productsGuardar);
		res.redirect('/products');

	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
		// Do the magic
		const productId = parseInt(req.params.id);


		// filtramos los que tengan id distinto al que buscamos...
		const productsFinal = products.filter(prod => prod.id != productId);        
		// guardamos...
		let productsGuardar = JSON.stringify(productsFinal,null,4);
		fs.writeFileSync(path.resolve(__dirname, '../data/productsDataBase.json'),productsGuardar);


		res.redirect('/products');
		
	}
};


module.exports = controller;