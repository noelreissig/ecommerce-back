const { Category } = require("../models");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

async function index(req, res) {
  const categories = await Category.findAll({});
  res.json(categories);
}
async function show(req, res) {
  const categories = await Category.findOne({
    where: { name: req.params.name },
  });
  if (categories) {
    statuscode = 200;
    res.json(categories);
  } else {
    statuscode = 404;
    res.send("Category not found");
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
      { new: true }
    );
    if (category) {
      res.statuscode = 200;
      res.send("Category created");
    } else {
      res.statuscode = 404;
      res.send("Error - Category not created. Please check data");
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

// async function store(req, res) {
// const { name, photo_url } = req.body;
// const [category, created] = await Category.create({
//   where: {
//     name: name,
//   },
//   default: {
//     name: name,
//     photo_url: photo_url,
//   },
// });
// if (created) {
//   res.statuscode = 200;
//   res.send("Category created");
// } else {
//   res.statuscode = 404;
//   res.send("Error - Category not created. Please check data");
// }
//}

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
      res.statuscode = 200;
      res.send("Category updated");
    } else {
      res.statuscode = 404;
      res.send("Error - Category not updated. Please check data");
    }
  });
}

// try {
//   const response = await Category.update(req.body, {
//     where: { id: req.params.id },
//   });

//   res.statuscode = 200;
//   res.send("Contenido actualizado");
// } catch (err) {
//   res.statuscode = 404;
//   res.send("Error 404 - El titulo y/o el contenido no pueden quedar vacios");
// }

async function destroy(req, res) {
  //validar que ningun producto use esa category antes de poder borrarlo
  try {
    const category = await Category.destroy({ where: { id: req.params.id } });
    res.statuscode = 200;
    res.send("Categoría eliminada");
  } catch {
    res.statuscode = 404;
    res.send("Error 404 - No se pudo eliminar");
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
