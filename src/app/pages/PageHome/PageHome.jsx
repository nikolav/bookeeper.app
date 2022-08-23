import { useRef, useState } from "react";
import Button from "@mui/material/Button";
// import { toast } from "react-toastify";
// import { supabase as s } from "../../services";
import { useStateSwitch } from "../../../hooks";

//
export default function PageHome() {
  const { isActive, toggle } = useStateSwitch();
  return (
    <section className="text-center">
      <h1>@index</h1>
      <Button onClick={toggle} variant="outlined" color="primary" size="small">
        ok
      </Button>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
        nesciunt suscipit perspiciatis.
      </p>
    </section>
  );
}
