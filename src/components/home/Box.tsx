import useAppData from "../../data/hook/useAppData";

export default function Box({ children }) {
   const {tema} = useAppData();
  const shadowClass = tema == "dark" ? 'shadow-dark' : 'shadow-light';
    return (
      <div className="flex justify-center items-center h-full">
        <div  className={`bg-gray-100 rounded-xl ${shadowClass}`}>
          {children}
        </div>
      </div>
    );
  }
  