interface JSONSchema {
  type: string;
  properties?: {
    [key: string]: JSONSchema;
  };
  items?: JSONSchema;
  required?: string[];
}

function validateJSON(data: any, schema: JSONSchema): boolean {
  if (schema.type === "object") {
    if (typeof data !== "object" || Array.isArray(data)) {
      return false;
    }

    if (schema.properties) {
      const keys = Object.keys(schema.properties);
      for (const key of keys) {
        if (!(key in data)) {
          if (schema.required && schema.required.includes(key)) {
            return false;
          }
          continue;
        }
        if (!validateJSON(data[key], schema.properties[key])) {
          return false;
        }
      }
    }

    if (schema.required) {
      for (const key of schema.required) {
        if (!(key in data)) {
          return false;
        }
      }
    }
  } else if (schema.type === "array") {
    if (!Array.isArray(data)) {
      return false;
    }

    if (schema.items) {
      for (const item of data) {
        if (!validateJSON(item, schema.items)) {
          return false;
        }
      }
    }
  } else {
    // Handle simple types such as string, number, boolean, null
    if (typeof data !== schema.type) {
      return false;
    }
  }

  return true;
}

function validateJSONFromFile(filePath: string, schema: JSONSchema): boolean {
  const fs = require("fs");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return validateJSON(data, schema);
}

export { validateJSON, JSONSchema, validateJSONFromFile };
