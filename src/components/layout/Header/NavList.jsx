import NavOption from "./NavOption";

const NavList = ({ navBarOptions, isDesktop }) => {
  return (
    <ul
      className={`
        ${!isDesktop 
          ? "flex-col space-y-1 py-3" 
          : "flex-row items-center"
        } 
        flex gap-7 lg:gap-8
      `}
    >
      {navBarOptions.map((navBarOption, index) => {
        return (
          <NavOption
            key={index}
            name={navBarOption.name}
            url={navBarOption.url}
          />
        );
      })}
    </ul>
  );
};

export default NavList;