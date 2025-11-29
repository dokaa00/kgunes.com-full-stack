/**
 * Encodes image path for proper URL handling
 * Handles spaces and special characters in filenames
 */
export const encodeImagePath = (path) => {
  if (!path) return '';
  
  // Split the path into parts
  const parts = path.split('/');
  
  // Encode each part (except the first empty one if path starts with /)
  const encodedParts = parts.map((part, index) => {
    // Don't encode the first part if it's empty (from leading /)
    if (index === 0 && part === '') return part;
    // Encode each part to handle spaces and special characters
    return encodeURIComponent(part);
  });
  
  return encodedParts.join('/');
};
