"use client";
import Link from "next/link";
import { useAdotanteStore } from "@/context/adotante";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export function Header() {
    const { adotante, deslogaAdotante } = useAdotanteStore();
    const router = useRouter();

    function sairAdotante() {
        deslogaAdotante();
        // Remove do localStorage o id do cliente logado (se ele indicou salvar no login)
        if (localStorage.getItem("client_key")) {
            localStorage.removeItem("client_key");
        }
        
        router.push("/login");
    }

    return (
        <nav className="bg-gray-400 border-gray-200 dark:bg-gray-900">
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src="./logo.png" className="h-20" alt="Flowbite Logo" />
                    <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
                        Adote <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                        .com</span>
                    </h1>
                </Link>
                <div className="flex items-center space-x-6 rtl:space-x-reverse">
                    {adotante.id ?               
                        <>
                            <Link href="/pedidos" className="text-black dark:text-white hover:underline">
                                <span className="cursor-pointer font-bold">{adotante.nome}</span>
                            </Link>
                            <span 
                                className="cursor-pointer font-bold text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={sairAdotante}>
                                Sair
                            </span>
                        </>
                        :
                        <>
                            <Link href="/cadastro" className="text-black dark:text-white hover:underline">
                                <span className="cursor-pointer font-bold">Cadastre-se</span>
                            </Link>
                            <Link href="/login" className="font-bold text-blue-600 dark:text-blue-500 hover:underline">
                                Entrar
                            </Link>
                        </>
                    }
                </div>
            </div>
        </nav>  
    );
}

