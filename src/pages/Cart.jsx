import { Button } from '../Button'
import { useCart } from '../contexts/CartContext'

export default function Cart() {
    const { items, totalCount, totalPrice, removeFromCart, updateQty, clearCart } = useCart()

    if (items.length === 0) {
        return (
            <div>
                <h2>Carrito</h2>
                <p>Tu carrito está vacío.</p>
            </div>
        )
    }

    
    return (
        <div>
            <h2>Carrito ({totalCount})</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {items.map((it) => (
                    <li key={it.id} style={{ borderBottom: '1px solid #eee', padding: 8, display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <strong>{it.name}</strong>
                            <div>Precio unidad: ${it.price?.toFixed(2)}</div>
                            <div>
                                Cantidad:
                                <input
                                    type="number"
                                    min={1}
                                    value={it.quantity}
                                    onChange={(e) => updateQty(it.id, Number(e.target.value))}
                                    style={{ width: 60, marginLeft: 8 }}
                                />
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div>Subtotal: ${(it.quantity * (it.price || 0)).toFixed(2)}</div>
                            <div style={{ marginTop: 8 }}>
                                <Button onClick={() => removeFromCart(it.id)}>Eliminar</Button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: 12 }}>
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Button onClick={() => alert('Checkout simulado')}>Pagar</Button>
                <Button onClick={() => clearCart()}>Vaciar carrito</Button>
            </div>
        </div>
    )
}
