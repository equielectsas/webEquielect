import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@/utils/tailwind/index";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const AccordionCustom = ({ title, text, id }) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Accordion open={open === id} icon={<Icon id={id} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(id)}>
          {title}
        </AccordionHeader>
        <AccordionBody>{text}</AccordionBody>
      </Accordion>
    </>
  );
};

export default AccordionCustom;
