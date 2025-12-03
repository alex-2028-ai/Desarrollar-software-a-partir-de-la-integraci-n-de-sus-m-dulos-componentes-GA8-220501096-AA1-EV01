import { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find((i) => i.id === action.item.id)
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.item.id ? { ...i, quantity: i.quantity + action.qty } : i
                    ),
                }
            }
            return {
                ...state,
                items: [...state.items, { ...action.item, quantity: action.qty }],
            }
        }
        case 'REMOVE':
            return { ...state, items: state.items.filter((i) => i.id !== action.id) }
        case 'UPDATE_QTY':
            return {
                ...state,
                items: state.items.map((i) => (i.id === action.id ? { ...i, quantity: action.qty } : i)),
            }
        case 'CLEAR':
            return { ...state, items: [] }
        default:
            throw new Error('Unknown action ' + action.type)
    }
}

const initialState = { items: [] }

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addToCart = (item, qty = 1) => dispatch({ type: 'ADD', item, qty })
    const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
    const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
    const clearCart = () => dispatch({ type: 'CLEAR' })

    return (
        <CartDispatchContext.Provider value={{ addToCart, removeFromCart, updateQty, clearCart }}>
            <CartStateContext.Provider value={state}>{children}</CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export function useCart() {
    const state = useContext(CartStateContext)
    const actions = useContext(CartDispatchContext)
    if (state === undefined || actions === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }

    const totalCount = state.items.reduce((s, i) => s + i.quantity, 0)
    const totalPrice = state.items.reduce((s, i) => s + i.quantity * (i.price || 0), 0)

    return { ...actions, items: state.items, totalCount, totalPrice }
}
