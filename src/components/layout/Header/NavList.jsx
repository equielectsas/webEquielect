import NavOption from "./NavOption";

const navList = ({ navBarOptions, isDesktop }) => {
  let classes;

  return (
    <ul
      className={`${
        !isDesktop ? "align-middle flex-col justify-center" : ""
      } mt-32 mb-4 flex gap-7 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6`}
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

export default navList;
