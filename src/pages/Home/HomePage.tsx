import type { ITool } from "../../types/Tool.type";
import "./HomePage.css";
import ToolList from "../../components/ToolList/ToolList";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

type Props = {
  toolList: ITool[];
  onDeleteTool: (id: number) => Promise<void>;
};

export default function HomePage({ toolList, onDeleteTool }: Props) {
  const location = useLocation();
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    const msg = (location.state as any)?.flash as string | undefined;
    if (!msg) return;

    setFlash(msg);
    setTimeout(() => setFlash(null), 3000);

    window.history.replaceState({}, document.title);
  }, [location.state]);

  return (
    <>
      <section className="section-content">
        {flash && <p className="success-text">{flash}</p>}
        <Link to="/tools/new">
          <input type="button" value="Add Tool" className="add-tool-btn" />
        </Link>

        <ToolList list={toolList} onDeleteTool={onDeleteTool} />
      </section>
    </>
  );
}

