'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { ShopCartContext } from '../context/shopcart'
import { Leaf } from 'lucide-react'

type ResumeShopProps = {
  open: boolean
  onClose: () => void
}

const ResumeShop = ({ open, onClose }: ResumeShopProps) => {
  const context = useContext(ShopCartContext)
  if (!context) return null

  const { items, removeItem, addItem, decrementItem } = context
  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0)

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-[#2c2416]/40 backdrop-blur-sm transition-opacity duration-500 ease-in-out data-closed:opacity-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700">
              <div className="flex h-full flex-col bg-[#f5f0e8] shadow-2xl">

                {/* ── Header ── */}
                <div className="px-5 py-5 border-b border-[#e0d5c5] bg-[#2c2416]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="text-[#5a7a4a] w-4 h-4" />
                      <DialogTitle className="text-base font-semibold text-[#e8dcc8] tracking-wide">
                        Tu Carrito
                      </DialogTitle>
                    </div>
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-1.5 rounded-full text-[#a89070] hover:text-[#e8dcc8] hover:bg-[#3d3020] transition-colors cursor-pointer"
                    >
                      <span className="sr-only">Cerrar</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* ── Items ── */}
                <div className="flex-1 overflow-y-auto px-5 py-6">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                      <Leaf className="text-[#c8a96e] w-10 h-10 opacity-40" />
                      <p className="text-sm text-[#8a7055]">Tu carrito está vacío.</p>
                      <button
                        onClick={onClose}
                        className="text-xs text-[#5a7a4a] underline underline-offset-2 cursor-pointer"
                      >
                        Seguir explorando
                      </button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-[#e0d5c5] space-y-1">
                      {items.map((item) => (
                        <li key={item.id} className="py-5 flex gap-4">
                          {/* Image */}
                          <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 bg-[#e8dcc8]">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              style={{ filter: "saturate(0.85)" }}
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-1 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-sm font-semibold text-[#2c2416] leading-tight">{item.title}</h3>
                                <p className="text-xs text-[#8a7055] mt-0.5">
                                  ${item.price.toLocaleString("es-AR")} c/u
                                </p>
                              </div>
                              <p className="text-sm font-bold text-[#2c2416] ml-2">
                                ${(item.price * item.qty).toLocaleString("es-AR")}
                              </p>
                            </div>

                            {/* Qty controls */}
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-3 bg-[#e8dcc8] rounded-lg px-3 py-1.5">
                                <button
                                  onClick={() => decrementItem(item.id)}
                                  className="text-[#5c4a30] hover:text-[#2c2416] font-bold text-base leading-none cursor-pointer transition-colors"
                                >
                                  −
                                </button>
                                <span className="text-sm font-semibold text-[#2c2416] min-w-[1ch] text-center">
                                  {item.qty}
                                </span>
                                <button
                                  onClick={() => addItem({ id: item.id, title: item.title, price: item.price, image: item.image })}
                                  className="text-[#5c4a30] hover:text-[#2c2416] font-bold text-base leading-none cursor-pointer transition-colors"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-xs text-[#a89070] hover:text-[#c0392b] transition-colors cursor-pointer underline underline-offset-2"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* ── Footer ── */}
                {items.length > 0 && (
                  <div className="border-t border-[#e0d5c5] px-5 py-6 bg-white">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm text-[#5c4a30]">Subtotal</p>
                      <p className="text-lg font-bold text-[#2c2416]">
                        ${subtotal.toLocaleString("es-AR")}
                      </p>
                    </div>
                    <p className="text-xs text-[#a89070] mb-5">
                      El envío se coordina al finalizar la compra.
                    </p>

                    <a
                      href={`https://wa.me/5491135209713?text=Hola!%20Quiero%20comprar:%20${items.map(i => `${i.qty}x%20${encodeURIComponent(i.title)}`).join('%2C%20')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex items-center justify-center w-full
                        py-3 rounded-xl
                         bg-[#4b5744] text-white
                        font-medium text-sm tracking-wide
                        hover:bg-[#4a6a3a] transition-colors
                        shadow-md shadow-[#5a7a4a]/20
                      "
                    >
                      Finalizar por WhatsApp
                    </a>

                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 w-full text-center text-xs text-[#8a7055] hover:text-[#5c4a30] transition-colors cursor-pointer"
                    >
                      Seguir comprando →
                    </button>
                  </div>
                )}

              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default ResumeShop
