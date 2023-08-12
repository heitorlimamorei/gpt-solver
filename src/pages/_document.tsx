import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const themeColor = "#232323"; // Defina a cor do tema aqui
    return (
      <Html lang="pt-br">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <link rel="icon" href="/logo180x180.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo180x180.png" />
          {/* Defina a cor da barra de endereço para o Microsoft Edge */}
          <meta name="msapplication-TileColor" content={themeColor} />

          {/* Defina a cor da barra de endereço para navegadores que não suportam a tag `meta[name=msapplication-TileColor]` */}
          <meta name="theme-color" content={themeColor} />
          <style>{`body { background-color: ${themeColor}; }`}</style>
          <meta name="description" content="Financial Controller o app que transforma seu dinheiro em sonhos!" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
