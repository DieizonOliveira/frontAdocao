"use client"; // Necessário para usar hooks e estado no Next.js

import { useEffect, useState } from "react";
import { Toaster } from 'sonner'; // Para notificações
import { useAdotanteStore } from "@/context/adotante"; // Contexto do adotante

// Definições de interfaces
interface Adotante {
  id: string;
  nome: string;
  email: string;
}

interface Animal {
  nome: string;
}

interface Pedido {
  id: string;
  animal: Animal;
  descricao: string;
  resposta?: string; // Esse campo pode ser opcional
  createdAt: string; // ou Date, dependendo do que você está recebendo
  adotante: Adotante;
}

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]); // Estado para armazenar os pedidos
  const { adotante } = useAdotanteStore(); // Obtém o adotante logado
  console.log("Adotante logado:", adotante); // Log do adotante

  useEffect(() => {
    const fetchPedidos = async () => {
      if (adotante && adotante.id) { // Verifica se adotante e adotante.id estão disponíveis
        console.log("ID do adotante:", adotante.id); // Log do ID do adotante
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos?adotanteId=${adotante.id}`);
          if (response.ok) {
            const dados = await response.json();
            console.log("Dados recebidos:", dados); // Log dos dados recebidos
            setPedidos(dados); // Armazena os dados no estado
          } else {
            console.error("Erro ao buscar pedidos:", response.statusText);
          }
        } catch (error) {
          console.error("Erro ao buscar pedidos:", error);
        }
      } else {
        console.warn("Adotante não está logado ou não possui ID."); // Log de aviso
      }
    };

    fetchPedidos(); // Chama a função para buscar pedidos
  }, [adotante]); // Dependência para recarregar quando o adotante mudar
  
  console.log("Pedidos armazenados:", pedidos); // Log dos pedidos armazenados
  
  return (
    <main className="max-w-screen-xl mx-auto p-4 ">
      <h1 className="mb-5 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-gray-900">
        Meus Pedidos
      </h1>

      {pedidos.length > 0 ? (
        <ul className="space-y-4">
          {pedidos.map((pedido) => (
            <li key={pedido.id} className="p-4 border border-gray-300 rounded-md bg-gray-200">
              <h2 className="text-xl font-bold">Pedido nº: {pedido.id}</h2>
              <p><strong>Animal:</strong> {pedido.animal.nome}</p>
              <p><strong>Descrição:</strong> {pedido.descricao}</p>
              <p><strong>Status:</strong> {pedido.resposta ? pedido.resposta : "Aguardando resposta"}</p>
              <p><strong>Data do Pedido:</strong> {new Date(pedido.createdAt).toLocaleDateString()}</p>
              <p><strong>Adotante:</strong> {pedido.adotante.nome}</p>
              <p><strong>Email:</strong> {pedido.adotante.email}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-600">Você não tem pedidos registrados.</p>
      )}

      <Toaster position="top-right" richColors />
    </main>
  );
}
