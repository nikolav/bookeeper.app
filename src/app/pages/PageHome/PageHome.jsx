import { useRef, useState } from "react";
import Button from "@mui/material/Button";
// import { toast } from "react-toastify";
// import { supabase as s } from "../../services";
import { Filesystem } from "../../../components";

export default function PageHome() {
  return (
    <section className="text-center">
      <h1>@index</h1>
      <Button
        onClick={() => null}
        variant="outlined"
        color="primary"
        size="small"
      >
        ok
      </Button>
      <Filesystem key="grcnxyhffbb" />
      <p>
        Lorem ipsum dolor sit , amet consectetur adipisicing elit. Facere
        nesciunt suscipit perspiciatis.
      </p>
    </section>
  );
}
