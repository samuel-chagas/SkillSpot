import { useState, useEffect } from 'react';
import "./Pedidos.css";

const Pedidos = ({ user }) => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const fetchAgendamentos = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/agendamentos/user/${user.id}`, {
          credentials: 'include'
        });
        const data = await response.json();
        setAgendamentos(data);
      } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
      }
    };

    if (user) {
      fetchAgendamentos();
    }
  }, [user]);

  if (!user) {
    return <div>Você precisa estar logado para ver seus agendamentos.</div>;
  }

  return (
    <div className="pedidos-container">
      <h2>Meus Agendamentos</h2>
      <ul>
        {agendamentos.map((agendamento) => (
          <li key={agendamento.id}>
            Produto ID: {agendamento.produtoId}, Data: {agendamento.data}, Hora: {agendamento.hora}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pedidos;