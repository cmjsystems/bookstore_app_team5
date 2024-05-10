// function Button({ onClick, label, ...props }) {
    function Button({ ...props }) {
        return (
            <button
                type="button"
                className="button_2"
                onClick={props.onClick}
                onMouseOver={e => e.currentTarget.style.backgroundColor = '#0056b3'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = '#007BFF'}
            >{props.label}</button>
        )
    }
    
    export default Button;