"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAdotanteStore } from "@/context/adotante";
import Image from 'next/image';

type Inputs = {
    email: string;
    senha: string;
    manter: boolean;
};

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>();
    const { logaAdotante } = useAdotanteStore();
    const router = useRouter();

    async function verificaLogin(data: Inputs) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/adotantes/login`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email: data.email, senha: data.senha })
        });

        if (response.status === 200) {
            const dados = await response.json();
            logaAdotante(dados); // Armazena no contexto

            // Lógica para manter o usuário logado
            if (data.manter) {
                localStorage.setItem("adotante", JSON.stringify(dados)); // Armazena o adotante completo
            } else {
                localStorage.removeItem("adotante");
            }

            router.push("/"); // Redireciona para a página principal
        } else {
            alert("Erro... Login ou Senha incorretos");
        }
    }

    return (
        <section className="bg-gray-200 dark:bg-gray-900">
            <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="./logo2.png" className="h-40" alt="Logo" />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Informe seus Dados de Acesso
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Login"
                                    required
                                    {...register("email")}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="*******"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...register("senha")}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            {...register("manter")}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Lembrar meus dados</label>
                                    </div>
                                </div>
                                <a href="/trocaSenha" className="text-sm font-medium text-gray-500 hover:underline dark:text-primary-500">
                                    Esqueci minha senha
                                </a>

                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                Entrar
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Não tem cadastro? <a href="/cadastro" className="font-medium text-primary-600 hover:underline dark:text-primary-500  text-gray-500  dark:text-white">Cadastre-se aqui</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
