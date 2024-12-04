"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TrocaSenha() {
  const router = useRouter(); // Inicializando o router
  const [email, setEmail] = useState("");
  const [codigoRecuperacao, setCodigoRecuperacao] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [repetirNovaSenha, setRepetirNovaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  const handleEnviarCodigo = async () => {
    if (!email) {
      setMensagem("Por favor, digite seu e-mail.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/adotantes/senha/solicitar-troca`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem("Código de recuperação enviado por e-mail.");
        setCodigoEnviado(true);
      } else {
        setMensagem(data.erro || "Erro ao solicitar código de recuperação.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem("Erro na requisição.");
    }
  };

  const handleTrocaSenha = async () => {
    if (!codigoRecuperacao || !novaSenha || !repetirNovaSenha) {
      setMensagem("Todos os campos devem ser preenchidos.");
      return;
    }

    if (novaSenha !== repetirNovaSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/adotantes/senha/trocar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, codigo: codigoRecuperacao, novaSenha })
      });

      const data = await response.json();
      if (response.ok) {
        setMensagem("Senha alterada com sucesso.");
        // Adicionando uma pausa de 2 segundos antes do redirecionamento
        setTimeout(() => {
          router.push('/login');
        }, 2000); // 2000 milissegundos = 2 segundos
      } else {
        setMensagem(data.erro || "Erro ao alterar senha.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem("Erro na requisição.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200  dark:bg-gray-900">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./duvida.png" className="h-40" alt="Logo" />
                </a>
      
      
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md  dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center  text-gray-900 md:text-2xl dark:text-white">Esqueceu sua senha?</h2>
        {!codigoEnviado ? (
          <>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
            />
            <button
              onClick={handleEnviarCodigo}
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Enviar Código de Recuperação
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Código de Recuperação"
              value={codigoRecuperacao}
              onChange={(e) => setCodigoRecuperacao(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
            />
            <input
              type="password"
              placeholder="Nova Senha"
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
            />
            <input
              type="password"
              placeholder="Repetir Nova Senha"
              value={repetirNovaSenha}
              onChange={(e) => setRepetirNovaSenha(e.target.value)}
              className="mb-4 p-2 w-full border rounded"
            />
            <button
              onClick={handleTrocaSenha}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              Alterar Senha
            </button>
          </>
        )}
        {mensagem && (
          <p className={`mt-4 text-center ${mensagem.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>
            {mensagem}
          </p>
        )}
      </div>
      </div>
    </div>
  );
}
