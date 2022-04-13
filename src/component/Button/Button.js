import './Button.scss'

const Button = ({ propsClassName, onClick, text }) => {
  return (
    <button className={`${propsClassName}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
