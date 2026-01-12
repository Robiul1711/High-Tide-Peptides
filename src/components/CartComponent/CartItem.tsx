import { FiTrash2 } from "react-icons/fi";
import type { CartItemType } from "../../types.cart";

interface Props {
  item: CartItemType;
  onIncrease: (id: string | number) => void;
  onDecrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
}

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <div className="border-b py-4">
      {/* ================= MOBILE ================= */}
      <div className="flex flex-col gap-4 sm:hidden">
        {/* Top: Image + Info */}
        <div className="flex items-center gap-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 object-cover rounded-sm border"
          />

          <div className="flex-1">
            <h3 className="font-medium text-sm">{item.title}</h3>
            {item.subtitle && (
              <p className="text-xs text-gray-500">{item.subtitle}</p>
            )}
            <p className="text-[#0E9FBA] font-semibold mt-1">
              ${item.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500"
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        {/* Bottom: Quantity + Total */}
        <div className="flex items-center justify-between">
          {/* Quantity */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecrease(item.id)}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              −
            </button>

            <span className="w-6 text-center font-medium">
              {item.quantity}
            </span>

            <button
              onClick={() => onIncrease(item.id)}
              className="w-8 h-8 rounded-full border flex items-center justify-center"
            >
              +
            </button>
          </div>

          {/* Total */}
          <p className="font-semibold text-[#0E9FBA]">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        {/* Image + Info */}
        <div className="flex items-center gap-4 w-[35%]">
          <img
            src={item.image}
            alt={item.title}
            className="w-14 h-14 object-cover rounded-sm border"
          />

          <div>
            <h3 className="font-medium">{item.title}</h3>
            {item.subtitle && (
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            )}
          </div>
        </div>

        {/* Price */}
        <p className="w-24 text-center font-semibold ">
          ${item.price.toFixed(2)}
        </p>

        {/* Quantity */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDecrease(item.id)}
            className="w-7 h-7 rounded-full border flex items-center justify-center"
          >
            −
          </button>

          <span className="w-6 text-center">{item.quantity}</span>

          <button
            onClick={() => onIncrease(item.id)}
            className="w-7 h-7 rounded-full border flex items-center justify-center"
          >
            +
          </button>
        </div>

        {/* Total */}
        <p className="w-24 text-center font-semibold ">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Remove */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
    </div>
  );
}
