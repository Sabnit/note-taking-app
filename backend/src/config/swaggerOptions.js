// swaggerOptions.js
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Note Taking API",
      version: "1.0.0",
      description: "API docs for the note taking app",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};
