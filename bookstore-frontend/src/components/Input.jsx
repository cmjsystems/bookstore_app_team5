function Input({ id, label, placeholder, value, onChange, type = "text" }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr' }}>
        <label
          className="label_form_2"
          htmlFor={id}
          style={{ marginTop: '8px' }}
        >
          {label}
        </label>

        <input
          className="input_form_2"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div >
    </>
  )
}

export default Input;