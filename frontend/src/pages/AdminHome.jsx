/* eslint-disable import/no-extraneous-dependencies */
import ClientList from "@components/ClientList";
import TextEditor from "@components/TextEditor";

export default function AdminHome() {
  return (
    <section className="background-home">
      <div className="position-admin--editor">
        <div className="background-texteditor">
          <TextEditor />
        </div>
        <ClientList />
      </div>
    </section>
  );
}
