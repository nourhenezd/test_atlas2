import Document, { Html, Head, Main, NextScript } from 'next/document';
import NavigationBottom from '../components/NavigationBottom';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="fr">
        <Head>
          <meta
            property="og:title"
            content="AtlasTN - la cartographie raisonnée de l'artisanat tunisien"
          />
          <meta
            property="og:description"
            content="La cartographie raisonnée de l’objet artisanal en Tunisie réalise la visibilité du produit artisanal, ses matériaux, ses producteurs et productrices, sa variété et son étendue tunisienne. Elle constitue un outil idoine pour les artisans (qui y trouveront une traçabilité de leur compétence créative) et pour les décideurs, les organes de diagnostic et d’études et les chercheurs impliqués dans la conception de stratégies de développement durable du secteur."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.atlastn.art/" />
          <meta
            property="og:image"
            content="https://live.staticflickr.com/65535/51736466092_ee329b9d17_c.jpg"
          />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap"
          />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap"
            media="print"
            onLoad="this.media='all'"
          />

          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Lato:wght@100;400;700;900&display=swap"
            />
          </noscript>
          <meta
            name="Cartographie raisonnée de l'artisanat tunisien"
            content="Developed by lifespaces for Fondation Rambourg"
          />
          <link rel="icon" href="/images/FR_favicon.png" />
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
