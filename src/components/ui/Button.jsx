const Button = ({ children, onClick, className }) => {
  return (
    <div className={`rounded-sm ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Button;
