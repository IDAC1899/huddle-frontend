// photos bigger than 2MB are turned away so pages stay quick to load
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// turns a photo picked from the computer into text (a data url)
// so it can be saved in the database like any other field
export function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}