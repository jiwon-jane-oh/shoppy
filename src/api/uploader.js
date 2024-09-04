export async function uploadImage(file) {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
  const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: data,
  });

  const result = await response.json();
  return result.url; // Return the URL after the image is uploaded

  // .then((response) => {
  //   return response.json();
  // })
  // .then((data) => data.url);
}
