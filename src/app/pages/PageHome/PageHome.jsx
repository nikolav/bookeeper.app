import Button from "@mui/material/Button";
import { supabase as s } from "../../services"

// 
export default function PageHome() {
    return (
      <section className="text-center">
        <h1>@index</h1>
        <Button variant="outlined" color="primary" size="small">ok</Button>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
          nesciunt suscipit perspiciatis.
        </p>
      </section>
    );
  }
  