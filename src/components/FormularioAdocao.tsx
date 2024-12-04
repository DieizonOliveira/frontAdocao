import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface FormularioAdocaoProps {
  adotanteId: string; // Mantido como string
  animalId: number;
}

export const FormularioAdocao: React.FC<FormularioAdocaoProps> = ({ adotanteId, animalId }) => {
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adotanteId: String(adotanteId), // Certificando que adotanteId é uma string
          animalId,
          descricao,
        }),
      });

      if (response.ok) {
        alert("Pedido de adoção enviado com sucesso!");
        router.push("/");
      } else {
        const errorData = await response.json();
        alert(`Erro ao enviar pedido: ${errorData.erro}`);
      }
    } catch (error) {
      alert("Ocorreu um erro ao enviar o pedido.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Formulário de Adoção</h2>
      <form onSubmit={handleSubmit}>
        <p className="mb-4 block text-gray-700">
          Em poucas palavras, diga se você já tem animais e porque gostaria de adotar este animal. Em breve entraremos em contato.
        </p>

        <div className="mb-4">
          <label className="block text-gray-700">Pedido:</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Insira aqui seu pedido de adoção..."
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Enviando..." : "Adotar"}
        </button>
      </form>
    </div>
  );
};
