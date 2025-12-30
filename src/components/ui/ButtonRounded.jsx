const ButtonRounded = ({ children, onClick, className }) => {
  return (
    <div className={`rounded-full ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default ButtonRounded;
