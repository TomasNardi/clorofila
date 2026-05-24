import { useContext, useState } from "react"
import { ShopCartContext } from "../context/shopcart"
import { ShoppingBag } from "lucide-react"
import ResumeShop from "./resumeshop"

const CartShop = () => {
  const context = useContext(ShopCartContext)
  if (!context) return null

  const { cartQuantity } = context
  const [showPopUp, setShowPopUp] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowPopUp(prev => !prev)}
        className="
          fixed bottom-6 right-6 z-50
          flex items-center justify-center
          w-14 h-14 rounded-full
          bg-[#2c2416] text-[#e8dcc8]
          shadow-xl shadow-[#2c2416]/30
          hover:bg-[#3d3020] hover:-translate-y-0.5
          transition-all duration-300
          cursor-pointer
        "
        aria-label="Abrir carrito"
      >
        <ShoppingBag size={22} strokeWidth={1.5} />

        {cartQuantity > 0 && (
          <span className="
            absolute -top-1 -right-1
            w-5 h-5 rounded-full
             bg-[#4b5744] text-white text-xs font-bold
            flex items-center justify-center
            shadow-sm
          ">
            {cartQuantity}
          </span>
        )}
      </button>

      <ResumeShop
        open={showPopUp}
        onClose={() => setShowPopUp(false)}
      />
    </>
  )
}

export default CartShop
