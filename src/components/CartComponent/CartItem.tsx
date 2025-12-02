
import { FiTrash2 } from "react-icons/fi";
import type { CartItemType } from "../../types.cart";

interface Props {
  item: CartItemType;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="flex items-center justify-between py-4 border-b">
      {/* Left: Image + text */}
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-14 h-14 object-contain rounded-lg"
        />

        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.subtitle}</p>
        </div>
      </div>

      {/* Price */}
      <p className="w-20 text-[#0E9FBA] font-semibold text-center">
        ${item.price.toFixed(2)}
      </p>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrease(item.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full border"
        >
          -
        </button>

        <span className="w-6 text-center">{item.quantity}</span>

        <button
          onClick={() => onIncrease(item.id)}
          className="w-7 h-7 flex items-center justify-center rounded-full border"
        >
          +
        </button>
      </div>

      {/* Total */}
      <p className="w-20 font-semibold text-[#0E9FBA] text-center">
        ${(item.price * item.quantity).toFixed(2)}
      </p>

      {/* Delete */}
      <button
        onClick={() => onRemove(item.id)}
        className="text-red-500 hover:text-red-600"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
}
