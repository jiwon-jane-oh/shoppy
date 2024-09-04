import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';

import useCarts from '../hooks/useCarts';

export default function ProductsDetail() {
  const {
    state: {
      product: { id, image, title, description, options, category, price },
    },
  } = useLocation();
  const [success, setSuccess] = useState();
  const { addOrUpdateItem } = useCarts();
  //const location= useLocation();
  // const { product } = location.state;
  const [selected, setSelected] = useState(options && options[0]);
  const handleSelect = (e) => setSelected(e.target.value);

  const handleClick = (e) => {
    //add to firebase

    const product = { id, image, title, price, option: selected, quantity: 1 };

    addOrUpdateItem.mutate(product, {
      onSuccess: () => {
        setSuccess('Added to cart.');
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      },
    });
  };
  return (
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4 ">
        <img className="w-full px-4 basis-7/12 " src={image} alt={title} />

        <div className="w-full basis-5/12 flex flex-col">
          <h2 className="text-3xl font-bold py-2 ">{title}</h2>
          <p className="text-2xl border-b py-2 border-gray-400">$ {price}</p>
          <p className="py-4 text-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              options:{' '}
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={handleSelect}
              value={selected}
            >
              {options &&
                options.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
            </select>
          </div>
          {success && <p className="m-2">✅ {success}</p>}
          <Button text={'add to cart'} onClick={handleClick} />
        </div>
      </section>
    </>
  );
}
