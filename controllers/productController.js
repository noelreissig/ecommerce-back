const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const { includes } = require("lodash");
const slugify = require("slugify");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const e = require("express");

async function index(req, res) {
	const products = await Product.findAll({ include: Category, order: [["id", "asc"]] });
	res.status(200).json(products);
}

async function showByCategory(req, res) {
	const category = await Category.findOne({
		where: { name: req.params.category },
	});
	const products = await Product.findAll({
		where: { categoryId: category.id },
	});
	res.status(200).json(products);
}

//consultar como funciona la busqueda por slug
async function show(req, res) {
	const products = await Product.findOne({ where: { slug: req.params.slug } });
	if (products) {
		res.status(200).json(products);
	} else {
		res.status(404).json({ Message: "Product not found" });
	}
}

//create de productos
async function store(req, res) {
	const form = formidable({
		multiples: false,
		keepExtensions: true,
	});
	form.parse(req, async (err, fields, files) => {
		const product = await Product.create(
			{
				name: fields.name,
				description: fields.description,
				details: fields.details,
				picture_url: files.picture_url.name,
				picture_2_url: files.picture_2_url.name,
				price: fields.price,
				stock: fields.stock,
				stared: fields.stared,
				slug: slugify(fields.name),
				categoryId: fields.categoryId,
			},
			{ new: true }
		);

		const supabase = createClient(
			"https://tyentfaqbpgmuskfbnwk.supabase.co",
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI5NzI1NzAwLCJleHAiOjE5NDUzMDE3MDB9.TrC1BuWa09EQc9ENGnwn6S3C12_3_wUfXFp9KkjWUeA"
		);

		await supabase.storage
			.from("ecommerce")
			.upload(
				`images/${files.picture_url.name}`,
				fs.createReadStream(files.picture_url.path),
				{
					cacheControl: "3600",
					upsert: false,
					contentType: files.picture_url.type,
				}
			);

		await supabase.storage
			.from("ecommerce")
			.upload(
				`images/${files.picture_2_url.name}`,
				fs.createReadStream(files.picture_2_url.path),
				{
					cacheControl: "3600",
					upsert: false,
					contentType: files.picture_2_url.type,
				}
			);

		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({
				Message: "Error - Product not created. Please check data",
			});
		}
	});
}

//edicion de productos
async function update(req, res) {
	const form = formidable({
		multiples: false,
		keepExtensions: true,
	});
	form.parse(req, async (err, fields, files) => {
		let hasPicture = false;
		if (
			files.hasOwnProperty("picture_url") &&
			files.picture_url.hasOwnProperty("name") &&
			files.picture_url.name != ""
		) {
			fields["picture_url"] = files.picture_url.name;
			hasPicture = true;
		} else {
			delete fields["picture_url"];
		}
		if (
			files.hasOwnProperty("picture_2_url") &&
			files.picture_2_url.hasOwnProperty("name") &&
			files.picture_2_url.name != ""
		) {
			fields["picture_2_url"] = files.picture_2_url.name;
			hasPicture = true;
		} else {
			delete fields["picture_2_url"];
		}
		const product = await Product.update(fields, {
			where: { id: req.params.id },
			returning: true,
			plain: true,
		});

		if (hasPicture) {
			const supabase = createClient(
				"https://tyentfaqbpgmuskfbnwk.supabase.co",
				"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjI5NzI1NzAwLCJleHAiOjE5NDUzMDE3MDB9.TrC1BuWa09EQc9ENGnwn6S3C12_3_wUfXFp9KkjWUeA"
			);

			if (fields.hasOwnProperty("picture_url")) {
				await supabase.storage
					.from("ecommerce")
					.upload(
						`images/${files.picture_url.name}`,
						fs.createReadStream(files.picture_url.path),
						{
							cacheControl: "3600",
							upsert: false,
							contentType: files.picture_url.type,
						}
					);
			}
			if (fields.hasOwnProperty("picture_2_url")) {
				await supabase.storage
					.from("ecommerce")
					.upload(
						`images/${files.picture_2_url.name}`,
						fs.createReadStream(files.picture_2_url.path),
						{
							cacheControl: "3600",
							upsert: false,
							contentType: files.picture_2_url.type,
						}
					);
			}
		}
		if (product) {
			res.status(200).json({ Message: "Product updated" });
			//que muestre algun cartel tipo toastify con que se agregó/modificó un producto
		} else {
			res.status(404).json({
				Message: "Error - Product not updated. Please check data",
			});
		}
	});
}

async function destroy(req, res) {
	try {
		await Product.destroy({ where: { id: req.params.id } });
		res.status(200).json({ Message: "Product was deleted" });
	} catch {
		res.status(404).json({
			Message: "Error - Product not deleted",
		});
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
	showByCategory,
};
