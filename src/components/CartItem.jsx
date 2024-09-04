import React from 'react';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';

import useCarts from '../hooks/useCarts';

export default function CartItem({
  product,
  product: { id, image, title, price, option, quantity },
}) {
  const ICON_CLASS =
    'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';

  const { addOrUpdateItem, removeItem } = useCarts();
  const handleMinus = () => {
    if (quantity < 2) return;

    addOrUpdateItem.mutate({ ...product, quantity: quantity - 1 });
  };
  const handlePlus = () => {
    addOrUpdateItem.mutate({ ...product, quantity: quantity + 1 });
  };
  const handleDelete = () => {
    removeItem.mutate(id);
  };
  return (
    <li className=" flex justify-between my-2 items-center" key={id}>
      <img className="w-24  md:w-48 rounded-lg" src={image} alt={title} />
      <div className="flex-1 ml-4  flex justify-between">
        <div className="basis-3/5">
          <p className="text-lg">{title}</p>
          <p className="text-xl font-bold text-brand">{option}</p>
          <p>${price}</p>
        </div>
        <div className="text-2xl flex items-center">
          <AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
          <span>{quantity}</span>
          <AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
          <RiDeleteBin5Fill className={ICON_CLASS} onClick={handleDelete} />
        </div>
      </div>
    </li>
  );
}
