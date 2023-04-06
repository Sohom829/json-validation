const { validateJSON, validateJSONFromFile } = require("../dist");
const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    age: { type: "number" },
    hobbies: {
      type: "array",
      items: { type: "string" },
    },
  },
  required: ["name", "age"],
};

const filePath = "data.json";

if (validateJSONFromFile(filePath, schema)) {
  console.log("Data is valid");
} else {
  console.error("Data is not valid");
}
