import Button from "@mui/material/Button";
// import { toast } from "react-toastify";
// import { supabase as s } from "../../services";
import { Collapse } from "../../../components";
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
      <Collapse isOpen={isActive}>
        <div className="bg-orange-200">
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt qui
            perspiciatis praesentium odio ab numquam, dignissimos minus nemo non
            eveniet provident nesciunt optio quia fugiat quae voluptates
            eligendi corporis pariatur magnam aperiam. Possimus perspiciatis
            illo, quidem a minima facilis facere quis, quibusdam, eveniet
            temporibus mollitia dignissimos officia delectus adipisci aliquid
            earum doloremque voluptas reprehenderit! Adipisci?
          </p>
        </div>
      </Collapse>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere
        nesciunt suscipit perspiciatis.
      </p>
    </section>
  );
}
