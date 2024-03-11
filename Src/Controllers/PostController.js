import PostSchemaZod from "../Schemas/PostSchema.js";
import PostModel from "../Models/PostModel.js";
import multer from "multer";
import path from "path";
import uploadImage from "../Utils/Clouddinary.js";
import fs from "fs/promises";

// Configurar multer para la subida de imágenes temporales en la carpeta temp
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

class PostController {
  static async create(request, response) {//* Create resources with image upload
    upload.single("Image")(request, response, async (err) => {
      if (err) {
        return response
          .status(400)
          .json({ Error: "Failed to upload image", Details: err });
      }
      const postData = request.body;
      const validationResult = PostSchemaZod.safeParse(postData);

      console.log(validationResult.success)
      if (true) {
        if (request.file) {
          const result = await uploadImage(request.file.path);
          postData.Post.ImageURL = result.url;
          console.log(postData);

          try {
            await fs.unlink(request.file.path);
            console.log("Temporary image deleted successfully");
          } catch (error) {
            console.error("Failed to delete temporary image", error);
          }
        }else{
          postData.Post.ImageURL = null;

        }

        const newPost = new PostModel(postData);
        newPost
          .save()
          .then(() => {
            response.json({ Message: "Resource created successfully" });
          })
          .catch((error) => {
            response
              .status(500)
              .json({ Error: "Failed to create resource", Details: error });
          });
      } else {
        response.status(400).json({
          Error: "Invalid data format",
          Details: validationResult.error,
        });
      }
    });
  }

  static async read(request, response) {
    //* Read resources
    PostModel.find({})
      .then((posts) => {
        response.json(posts);
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to read resources", Details: error });
      });
  }
  static async readUnique(request, response) {
    //* Read unique resource
    const { id } = request.params;
    PostModel.findById(id)
      .then((post) => {
        if (post) {
          response.json(post);
        } else {
          response.status(404).json({ Error: "Resource not found" });
        }
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to read unique resource", Details: error });
      });
  }

  static async update(request, response) {
    upload.single("Image")(request, response, async (err) => {
      if (err) {
        return response
          .status(400)
          .json({ Error: "Failed to upload image", Details: err });
      }

      const { id } = request.params;

      const dataObjectDB = await PostModel.findOne({
        _id: id,
      });

      console.log(dataObjectDB.Post, request.body.Post);

      if (dataObjectDB.Post) {
        dataObjectDB.Post.Content =
          request.body.Post?.Content ?? dataObjectDB.Post.Content;
        dataObjectDB.Post.IsDisable =
          request.body.Post?.IsDisable ?? dataObjectDB.Post.IsDisable;
        dataObjectDB.Post.ImageURL =
          request.body.Post?.ImageURL ?? dataObjectDB.Post.ImageURL;
      }
      const postData = dataObjectDB;

      if (request.file) {
        const result = await uploadImage(request.file.path);
        postData.Post.ImageURL = result.url;
        try {
          await fs.unlink(request.file.path);
          console.log("Temporary image deleted successfully");
        } catch (error) {
          console.error("Failed to delete temporary image", error);
        }
      }

      PostModel.updateOne({ _id: id }, { $set: postData })
        .then(() => {
          response.json({ Message: "Resource updated successfully" });
        })
        .catch((error) => {
          response
            .status(500)
            .json({ Error: "Failed to update resource", Details: error });
        });
    });
  }

  static async delete(request, response) {
    //* Delete resources
    const { id } = request.params;
    PostModel.findByIdAndDelete(id)
      .then(() => {
        response.json({ Message: "Resource deleted successfully" });
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to delete resource", Details: error });
      });
  }
}

export default PostController;
