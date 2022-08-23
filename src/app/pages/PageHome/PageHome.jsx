import Button from "@mui/material/Button";
import { toast } from "react-toastify"
import { supabase as s } from "../../services"

// 
export default function PageHome() {
    return (
      <section className="text-center">
        <h1>@index</h1>
        <Button onClick={() => toast.info(Date.now())} variant="outlined" color="primary" size="small">ok</Button>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
          nesciunt suscipit perspiciatis.
        </p>
      </section>
    );
  }
  