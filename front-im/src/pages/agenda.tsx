import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/Agenda.module.css";

interface AgendaItem {
  id: number;
  titulo: string;
  descricao: string;
  dataHora: string;
  prioridade: string;
}

const Agenda: React.FC = () => {
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const token = localStorage.getItem("token"); // Supondo que o token JWT está no localStorage
        const response = await axios.get<AgendaItem[]>("/api/agenda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAgenda(response.data);
      } catch (err) {
        setError("Erro ao carregar a agenda.");
      } finally {
        setLoading(false);
      }
    };

    fetchAgenda();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h1>Minha Agenda</h1>
      {agenda.length === 0 ? (
        <p>Não há compromissos.</p>
      ) : (
        <ul>
          {agenda.map((item) => (
            <li key={item.id} className={styles.item}>
              <h2>{item.titulo}</h2>
              <p>{item.descricao}</p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(item.dataHora).toLocaleString("pt-BR")}
              </p>
              <p>
                <strong>Prioridade:</strong> {item.prioridade}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Agenda;
