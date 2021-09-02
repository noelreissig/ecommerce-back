const { Category } = require("../models");
const { Product } = require("../models");

const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

async function index(req, res) {
	const categories = await Category.findAll({ order: [["id", "asc"]] });
	res.json(categories);
}
async function show(req, res) {
	const categories = await Category.findOne({
		where: { name: req.params.name },
	});
	if (categories) {
		res.status(200).json(categories);
	} else {
		res.status(404).json({ Message: "Category not found" });
	}
}

async function store(req, res) {
	const form = formidable({
		multiples: false,
		keepExtensions: true,
	});
	form.parse(req, async (err, fields, files) => {
		const category = await Category.create(
			{
				name: fields.name,
				photo_url: files.photo_url.name,
			},
			{ isNewRecord: true }
		);

		if (category) {
			res.status(200).json({ Message: "Category created" });
		} else {
			res.status(404).json({
				Message: "Error - Category not created. Please check data",
			});
		}
		const supabase = createClient(
			"https://tyentfaqbpgmuskfbnwk.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI5NzI1NzAwLCJleHAiOjE5NDUzMDE3MDB9.TrC1BuWa09EQc9ENGnwn6S3C12_3_wUfXFp9KkjWUeA"
		);
		const { data, error } = await supabase.storage
			.from("ecommerce")
			.upload(
				`categories/${files.photo_url.name}`,
				fs.createReadStream(files.photo_url.path),
				{
					cacheControl: "3600",
					upsert: false,
					contentType: files.photo_url.type,
				}
			);
		res.json(category);
	});
}

async function update(req, res) {
	const form = formidable({
		multiples: false,
		keepExtensions: true,
	});
	form.parse(req, async (err, fields, files) => {
		let hasPicture = false;
		if (
			files.hasOwnProperty("photo_url") &&
			files.photo_url.hasOwnProperty("name") &&
			files.photo_url.name != ""
		) {
			fields["photo_url"] = files.photo_url.name;
			hasPicture = true;
		} else {
			delete fields["photo_url"];
		}
		const category = await Category.update(fields, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});
		if (hasPicture) {
			const supabase = createClient(
				"https://tyentfaqbpgmuskfbnwk.supabase.co",
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI5NzI1NzAwLCJleHAiOjE5NDUzMDE3MDB9.TrC1BuWa09EQc9ENGnwn6S3C12_3_wUfXFp9KkjWUeA"
			);

			if (fields.hasOwnProperty("photo_url")) {
				await supabase.storage
					.from("ecommerce")
					.upload(
						`categories/${files.photo_url.name}`,
						fs.createReadStream(files.photo_url.path),
						{
							cacheControl: "3600",
							upsert: false,
							contentType: files.photo_url.type,
						}
					);
			}
		}
		if (category) {
			res.status(200).json({ Message: "Category updated" });
		} else {
			res.status(404).json({
				Message: "Error - Category not updated. Please check data",
			});
		}
	});
}

async function destroy(req, res) {
	const products = await Product.findAll({
		where: { categoryId: req.params.id },
	});
	// console.log(products.length);
	//valida que ningún producto use esa category antes de poder borrarlo
	if (products.length > 0) {
		res.status(403).json({
			Message: "No se pueden eliminar categorías con productos asociados",
		});
	} else {
		try {
			await Category.destroy({ where: { id: req.params.id } });
			res.status(200).json({ Message: "Category deleted" });
		} catch (error) {
			res.send(404).json({ Message: "Error - Category not deleted" });
		}
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
};
