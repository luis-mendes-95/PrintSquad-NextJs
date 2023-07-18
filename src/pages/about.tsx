
import { NextPage } from "next";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { DivAboutBase } from "../styles/about";
import { GoogleFonts } from "next-google-fonts";
import Image from "next/image";

const AboutPage: NextPage = () => {
return (
<DivAboutBase>
<GoogleFonts href="https://fonts.googleapis.com/css2?family=Anton&family=Fjalla+One&family=Righteous&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Vina+Sans&display=swap" />
<Header />
<main>
<h1 className="h1AboutTitle">Sobre a PrintSquad</h1>
<p>
Conheça a PrintSquad: a plataforma colaborativa para designers,
vendedores e o setor de produção! Com a PrintSquad, você tem uma
comunicação perfeita entre todos os envolvidos no processo criativo.
Não importa se você é um designer talentoso, um vendedor dedicado ou
faz parte do setor de produção, o nosso aplicativo revolucionário está
aqui para simplificar e agilizar o fluxo de trabalho.
<br />
<br />
Imagine só: o designer gráfico recebe acesso direto às ordens de
serviço criadas pelos vendedores. Assim que o trabalho é concluído, o
mockup é enviado por upload e a ordem de serviço entra em status de
aguardando autorização. Mas não para por aí! Se houver qualquer
solicitação de alteração por parte do cliente, basta apertar o botão
correspondente no aplicativo, e o designer será notificado
instantaneamente.
<br />
<br />
E não se preocupe, o setor de produção também desempenha um papel
fundamental na PrintSquad. Assim que o processo é finalizado, a equipe
de produção tem acesso à ordem de serviço e pode finalizá-la com
eficiência, tudo de forma simples e organizada, diretamente pelo
aplicativo. Estamos aqui para aumentar a produtividade, gerar mais
tempo e garantir que todos os envolvidos trabalhem em sincronia. Com a
PrintSquad, a colaboração entre designers, vendedores e o setor de
produção se torna mais eficiente do que nunca.
<br />
<Image src="https://res.cloudinary.com/dwadq5lzp/image/upload/v1688274019/giphy_thtrih.gif" alt="designerPower" width={250} height={250} style={{borderRadius:"50%"}}/>
<br />
Descubra a parceria perfeita e alcance resultados incríveis com a
PrintSquad. Experimente hoje mesmo e descubra como essa plataforma
pode transformar a forma como você trabalha em equipe. Junte-se a nós
e seja parte dessa revolução no processo criativo!
<br />
<br />
PrintSquad: onde a colaboração flui e os resultados surpreendem!
</p>
</main>
<Footer />
</DivAboutBase>
);
};

export default AboutPage