import Layout from '../components/template/Layout'
import useSheets from '../data/hook/useSheets'


export default function Perfil() {
  const { sheet } = useSheets();
  return (
    <div className={``}>
      <Layout titulo="Perfil de usuario" subtitulo="Gerencie suas informações aqui!">

      </Layout>
    </div>
  )
}
