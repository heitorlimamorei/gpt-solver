import { createContext, useState, useEffect } from "react";
//type Tema = "dark" | ""
interface AppContextProps {
  tema: string;
  alternarTema: () => void;
  isLoading: boolean;
  toggleIsLoading: () => void;
}
type TypeAppContextProvider = {
  children: any;
};

const AppContext = createContext<AppContextProps>({
  tema: "dark",
  alternarTema: null,
  isLoading: false,
  toggleIsLoading: null
});

export function AppContextProvider(props: TypeAppContextProvider) {
  const [tema, setTema] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  function alternarTema() {
    const novoTema = tema === "dark" ? "" : "dark";
    setTema(novoTema);
    localStorage.setItem("tema", novoTema);
  }
  function toggleIsLoading() {
    setIsLoading(c => !c);
  }
  useEffect(() => {
    const tema = localStorage.getItem("tema");
    setTema(tema);
  }, []);

  return (
    <AppContext.Provider
      value={{
        tema: tema,
        alternarTema,
        isLoading,
        toggleIsLoading
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContext;
