import React, { useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';

import useProducts from '../hooks/useProducts';

export default function NewProducts() {
  const [product, setProduct] = useState({});
  const [file, setFile] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState();
  // const queryClient = useQueryClient();
  // const addProduct = useMutation({
  //   mutationFn: ({ product, url }) => addNewProduct(product, url),
  //   onSuccess: () => queryClient.invalidateQueries(['products']),
  // });

  const { addProduct } = useProducts();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    //upload image to cloudinary and get URL
    uploadImage(file)
      .then((url) => {
        //add product to firebase
        addProduct.mutate(
          { product, url },
          {
            onSuccess: () => {
              // addNewProduct(product, url) //
              // .then(() => {
              setSuccess('Add the product successfully.');
              setTimeout(() => {
                setSuccess(null);
              }, 4000);
              // });
            },
          }
        );
      })
      .finally(() => setIsUploading(false));
  };

  const handleChange = (e) => {
    console.log(e.target);
    const { name, value, files } = e.target;
    console.log(name, value, files);
    if (name === 'file') {
      setFile(files && files[0]);
      return;
    }
    setProduct((product) => ({ ...product, [name]: value }));
  };

  return (
    <section className="w-full text-center">
      <h2 className="text-2xl font-bold my-4">New Product Register</h2>
      {success && <p className="my-2"> ✅ {success}</p>}

      {file && (
        <img
          className="w-96 m-auto mb-2"
          src={URL.createObjectURL(file)}
          alt="local file"
        />
      )}
      <form className="flex flex-col px-12 " onSubmit={handleSubmit}>
        <input
          accept="image/*"
          type="file"
          name="file"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="product name"
          required
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="price"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="category"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="product description"
          required
          onChange={handleChange}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="options (seperate by comma (,))"
          required
          onChange={handleChange}
        />
        <Button
          text={isUploading ? 'Uploading....' : 'Add Products'}
          disabled={isUploading}
        />
      </form>
    </section>
  );
}
