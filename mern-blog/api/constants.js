export const constants = {
  VALIDATION_ERROR: { code: 400, message: "Validation error occurred." },
  UNAUTHORIZED: { code: 401, message: "Unauthorized." },
  FORBIDDEN: {code: 403, message: "Forbidden"}, 
  NOT_FOUND: { code: 404, message: "Not Found." },
  SERVER_ERROR: { code: 500, message: "Some internal server error occurred." },
  OK: { code: 200, message: "OK." }, // Status code for successful response
  CREATED: { code: 201, message: "Resource created." }, // Status code for resource creation
  NO_CONTENT: { code: 204, message: "No content." } // Status code for successful request with no content
};
 