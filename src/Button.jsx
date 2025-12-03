
export const Button = ({ onClick, children, className = '', ...props }) => {
    const classNames = `btn ${className}`.trim()
    return (
        <button {...props} onClick={onClick} className={classNames}>
            {children}
        </button>
    )
}

