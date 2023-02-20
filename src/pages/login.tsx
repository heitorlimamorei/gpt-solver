import CabecalhoHome from "../components/home/CabecalhoHome";
import useAppData from "../data/hook/useAppData";

function Login() {
    const {tema, alternarTema} = useAppData()
    return (
        <div className={`${tema}`}>
            <CabecalhoHome/>
            <div className="flex flex-row w-[100%] h-[90vh] dark:bg-[#232323] bg-[#E0E5EC] dark:text-white text-black">
                <div className="flex flex-col items-center w-[40%]">
                    <h1 className="w-[80%] text-5xl font-bold ">Conheça o Financial Controller!</h1>
                    <p className="text-xl w-[80%] mt-5">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fusce id velit ut tortor pretium viverra suspendisse potenti. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Arcu dui vivamus arcu felis. Aliquam ultrices sagittis orci a scelerisque purus semper eget duis. Consectetur purus ut faucibus pulvinar elementum integer enim neque volutpat. Sem viverra aliquet eget sit amet tellus cras adipiscing enim. Magna fringilla urna porttitor rhoncus dolor. Mauris rhoncus aenean vel elit scelerisque. Eu scelerisque felis imperdiet proin fermentum leo vel orci porta. Sem et tortor consequat id porta nibh.
                        <br />
                        <br />
                        Velit ut tortor pretium viverra suspendisse potenti. Ut placerat orci nulla pellentesque dignissim enim. Ullamcorper malesuada proin libero nunc consequat interdum. Cras semper auctor neque vitae tempus. Id eu nisl nunc mi ipsum faucibus. Aenean et tortor at risus. Tincidunt tortor aliquam nulla facilisi. Enim ut tellus elementum sagittis vitae et leo. Consectetur adipiscing elit ut aliquam purus sit. Suspendisse interdum consectetur libero id. Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Felis eget nunc lobortis mattis. Leo urna molestie at elementum eu facilisis sed. Vel pharetra vel turpis nunc eget lorem dolor. Cras adipiscing enim eu turpis egestas pretium aenean. Amet consectetur adipiscing elit pellentesque habitant morbi. Eget nullam non nisi est sit amet. Ultricies mi quis hendrerit dolor magna.
                    </p>
                </div>
                <div className="w-[60%] flex items-center justify-center">
                    <div className="dark:shadow-[inset_10px_10px_19px_#121212,inset_-10px_-10px_19px_#343434] shadow-[inset_10px_10px_19px_#727578,inset_-10px_-10px_19px_#FFFFFF] rounded-[5rem] w-[80%] h-[90%] flex items-center justify-center">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;