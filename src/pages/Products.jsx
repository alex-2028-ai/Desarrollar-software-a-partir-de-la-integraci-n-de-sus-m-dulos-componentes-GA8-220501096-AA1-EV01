import React from 'react'
import { Button } from '../Button'
import { useCart } from '../contexts/CartContext'

const MOCK_PRODUCTS = [
    { id: 'p1', name: 'Camiseta', price: 19.99, description: 'Camiseta de algodón' },
    { id: 'p2', name: 'Pantalones', price: 39.99, description: 'Pantalones cómodos' },
    { id: 'p3', name: 'Gorra', price: 9.99, description: 'Gorra unisex' },
]

export default function Products() {
    const { addToCart } = useCart()

    return (
        <div>
            <div className="hero">
                <div className="headline">
                    <h2>#LoNuevo</h2>
                    <p>Conoce lo más hot.</p>
                </div>
                <div>
                    <div className="products-grid">
                        {MOCK_PRODUCTS.map((p) => (
                            <div key={p.id} className="product-card">
                                <div className="product-media">
                                    {/* placeholder image */}
                                    <img src={`https://picsum.photos/seed/${p.id}/800/800`} alt={p.name} />
                                    <button className="product-add" aria-label={`Agregar ${p.name}`} onClick={() => addToCart(p, 1)}>+</button>
                                </div>
                                <div className="product-info">
                                    <div className="product-title">{p.name}</div>
                                    <div className="product-price">${p.price.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
