import { create } from 'zustand';
import { AdotanteI } from '@/utils/types/adotantes';

type AdotanteStore = {
    adotante: AdotanteI;
    logaAdotante: (adotanteLogado: AdotanteI) => void;
    deslogaAdotante: () => void;
};

export const useAdotanteStore = create<AdotanteStore>((set) => {
    let adotanteInicial: AdotanteI = {} as AdotanteI;

    // Verifica se está no ambiente do navegador
    if (typeof window !== "undefined") {
        const storedAdotante = localStorage.getItem("adotante");
        adotanteInicial = storedAdotante ? JSON.parse(storedAdotante) : {} as AdotanteI;
    }

    return {
        adotante: adotanteInicial, // Inicializa com o adotante armazenado
        logaAdotante: (adotanteLogado) => {
            set({ adotante: adotanteLogado });
            if (typeof window !== "undefined") {
                localStorage.setItem("adotante", JSON.stringify(adotanteLogado)); // Armazena no local storage
            }
        },
        deslogaAdotante: () => {
            set({ adotante: {} as AdotanteI });
            if (typeof window !== "undefined") {
                localStorage.removeItem("adotante"); // Remove do local storage ao deslogar
            }
        },
    };
});

    
