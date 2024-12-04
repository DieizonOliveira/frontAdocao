"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Inputs = {
    nome: string;
    fone: string;
    endereco: string;
    email: string;
    senha: string;
};

export default function Cadastro() {
    const { register, handleSubmit } = useForm<Inputs>();
    const router = useRouter();
    const [message, setMessage] = useState("");

    const onSubmit = async (data: Inputs) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/adotantes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            setMessage("Cadastro efetuado com sucesso!");
            setTimeout(() => {
                router.push("/login"); // Redireciona após 2 segundos
            }, 2000);
        } else {
            const errorData = await response.json();
            console.log('Erro retornado da API:', errorData); // Para depuração
        
            // Verifica se errorData.erro está definido antes de usar includes
            if (errorData.erro) {
                if (errorData.erro.includes("email")) {
                    setMessage("Esse e-mail já está cadastrado.");
                } else {
                    setMessage(errorData.erro || "Erro ao cadastrar, tente novamente.");
                }
            } else {
                setMessage("Erro ao cadastrar, tente novamente.");
            }
        }
    };

    return (
        <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex items-center space-x-4">
    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Cadastro de Adotante
    </h1>

    <a className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="./pegada.png" className="h-20" alt="Logo" />
    </a>
</div>



                        {message && <p className="text-red-500">{message}</p>} {/* Mensagem de erro ou sucesso */}
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                                <input type="text" id="nome" {...register("nome")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="fone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                                <input type="tel" id="fone" {...register("fone")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="endereco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                                <input type="text" id="endereco" {...register("endereco")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" id="email" {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                <input type="password" id="senha" {...register("senha")} className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Cadastrar
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Já é cadastrado? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500  text-gray-500  dark:text-white">Entre com seus dados.</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
