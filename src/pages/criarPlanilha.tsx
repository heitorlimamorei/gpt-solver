import CreateSheet from "../components/template/CreateSheet"
import { useState } from "react";
import { sheetProps } from "../types/sheetTypes";
import Layout from "../components/template/Layout";

export default function CriarPlanilha() {
    const [sheets, setSheets] = useState<sheetProps[]>([]);
    return(
        <Layout titulo="" subtitulo="" >
            <div className="h-[80vh] p-3 rounded-2xl mb-[100px] w-[40%] self-center dark:text-white dark:shadow-[12px_12px_32px_#0f0f0f,-12px_-12px_32px_#373737] shadow-[12px_12px_32px_#5e6063,-12px_-12px_32px_#ffffff]">
                <CreateSheet
                    toggleIsOpen={null}
                    addSheetIntoTheList={setSheets}
                />
            </div>
        </Layout>
    )
}