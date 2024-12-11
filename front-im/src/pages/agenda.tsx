import { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
}

const Agenda: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/agenda", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(response.data);
      } catch (err) {
        console.error("Erro ao carregar a agenda", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Minha Agenda</h1>

        {loading ? (
          <p className="text-center text-gray-600">Carregando...</p>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-600">
            Nenhum evento cadastrado para esta agenda.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <p className="text-gray-500">
                  <strong>Data:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agenda;
