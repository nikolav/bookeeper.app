import { ApplicationBar } from "../../../components";
//
const GIT_LINK =
  "https://github.com/nikolav/bookeeper.app/tree/production--application-command-bar";
//
export default function PageHome() {
  //
  return (
    <section className="text-center">
      <h1>@index</h1>
      <div className="flex justify-center">
        <ApplicationBar />
      </div>
      <hr className="m-0 p-0 block" />
      <div className="mt-12">
        <p> <em>ReactJS</em> <strong>&lt;ApplicationBar&gt;</strong></p>
        <p>Application command bar for desktop type online applications.</p>
        <p>
          <a
            className="link text-indigo-500"
            rel="norefferer noopenenr"
            target="_blank"
            href={GIT_LINK}
          >
            code@github
          </a>
        </p>
        <p>
          <a
            className="link text-indigo-500"
            rel="norefferer noopenenr"
            target="_blank"
            href="https://nikolav.rs/"
          >
            admin
          </a>
        </p>
      </div>
    </section>
  );
}
