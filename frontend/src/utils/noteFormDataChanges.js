export const formDataChanges = ({ formData, originalData }) => {
  const changedData = {};
  // Compare each field with original data to find changes

  // Title
  if (formData.title !== originalData.title) {
    changedData.title = formData.title;
  }

  // Description
  if (formData.description !== originalData.description) {
    changedData.description = formData.description;
  }

  // Date
  if (formData.date !== originalData.date) {
    changedData.date = formData.date;
  }

  // CategoryIds
  if (
    JSON.stringify(formData.categoryIds.sort()) !==
    JSON.stringify(originalData.categoryIds.sort())
  ) {
    changedData.categoryIds = formData.categoryIds;
  }

  return changedData;
};
