import { useState } from "react";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

//AS IMPORTAÇÕES ACIMA DEIXAR COMO ESTÁ

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

//ESTA É A INTERFACE DE MINHAS PROPS

//ABAIXO COMEÇA MEU COMPONENTE DE FORMULÁRIO

const AddFileFormModal = ({ serviceOrder }: iCardServiceOrderProps) => {

  //ABAIXO APENAS UMA FUNÇÃO PARA SETAR O ESTADO DE MOSTRAR O MODAL OU NÃO
  const { SetShowFileModal } = useServiceOrder();

  //SETANDO UM ARRAY INICIAL VAZIO DE ARQUIVOS
  const [files, setFiles] = useState<File[]>([]);

  //SETANDO O ESTADO "UPLOADING" POIS QUANDO A REQUISIÇÃO FOR FEITA E ESTIVER ESPERANDO RESPOSTA, ISSO VAI VIRAR TRUE
  const [uploading, setUploading] = useState(false);

  //DECLARAÇÃO DO ROUTER PARA SER USADO
  const router = useRouter();

  //DECLARANDO COOKIES PUXANDO DO NAVEGADOR OS COOKIES SALVOS
  const cookies = parseCookies();

  //DECLARANDO UM TOKEN SALVO DOS COOKIES DO NAVEGADOR
  const token = cookies["printsquad.token"];

  //QUANDO INSERIR UM OU MAIS ARQUIVOS, ESTA FUNÇÃO SERÁ CHAMADA, ALTERANDO O ARRAY DE ARQUIVOS COM OS NOVOS INSERIDOS
  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const filesArray = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  //ESSA FUNÇÃO ABAIXO SERÁ CHAMADA QUANDO FOR PRA FAZER UM SUBMIT DO ARRAY DE ARQUIVOS
  const onFileFormSubmit = async () => {

    //SE ESTIVER COM 0 ARQUIVO, VAI DAR ESSE ERRO
    if (files.length === 0) {
      toast.error("Selecione pelo menos um arquivo.");
      return;
    }

    //SE O CÓDIGO CHEGOU AQUI, VAI SETAR O ESTADO DE UPLOADING PRA TRUE PRA PODER ALTERAR IMAGEM DO BOTÃO ENQUANTO ESPERA RESPOSTA DA REQUISIÇÃO
    setUploading(true);

    //AQUI SETA UM ARRAY QUE VAI RECEBER AS RESPOSTAS DE CADA REQUISIÇÃO DE UPLOAD DE ARQUIVO. AQUELE ARRAY DE ARQUIVOS INICIALMENTE, SERÁ FEITO UPLOAD DE CADA ARQUIVO UM A UM,
    //E O RESULTADO DE CADA UPLOAD SERÁ UM LINK, QUE SERÁ INSERIDO NO ARRAY ABAIXO CADA UM COMO UMA STRING.
    const downloadLinks: string[] = [];

    //AQUI VAI COMEÇAR O LOOP NO ARRAY DE ARQUIVOS PARA INICIAR O PROCESSO DE UPLOAD
    for (let i = 0; i < files.length; i++) {

      //AQUI DEFINE O PRIMEIRO ARQUIVO USANDO O INDEX
      const file = files[i];

      //AQUI CRIA UM NOVO FORMDATA
      const fileFormData = new FormData();

      //AQUI FAZ UM APPEND DO FILE DENTRO DO FORMDATA
      fileFormData.append("file", file);

      //AQUI SETA O SUCESSO DO UPLOAD, INICIALMENTE FALSE POIS AINDA NÃO TERMINOU
      let uploadSuccess = false;

      //AQUI DEFINE O NÚMERO DE TENTATIVAS DE SUBIR O ARQUIVO NA API DO ANONFILES, POIS AS VEZES DÁ ERRO, ENTÃO SERÁ FEITO ATÉ 3 TENTATIVAS, SE NÃO DER, VAI PARTIR PARA O PRÓXIMO ARQUIVO
      let attempts = 0;

      //AQUI INICIA O LOOP DAS TENTATIVAS DE SUBIR O PRIMEIRO ARQUIVO
      while (!uploadSuccess && attempts < 3) {

        //********************************************************************************************************************/
        //ESSA PARTE ABAIXO PRECISA SER RESPONSABILIDADE DO BACKEND, POIS ESTÁ RETORNANDO ERRO DE CORS QUANDO FEITA NO FRONTEND
        try {

          //AQUI DEFINE UMA RESPONSE COMO A RESPOSTA DA REQUISIÇÃO DO ANONFILES, COM O PARÂMETRO DO FORMDATA
          const response = await api.post("https://api.anonfiles.com/upload", fileFormData);

          //AQUI DEFINE OS DADOS DA RESPOSTA DA REQUISIÇÃO
          const data = response.data;

          //SE O STATUS DOS DADOS FOR TRUE, VAI FAZER O SEGUINTE:
          if (data.status === true) {

            //VAI DEFINIR O LINK DE DOWNLOAD PEGANDO DO SOURCE ABAIXO
            const downloadUrl = data.data.file.url.full;

            //VAI FAZER UM PUSH NAQUELE ARRAY DE STRINGS DECLARADO ANTERIORMENTE PARA SALVAR LINKS DE DOWNLOADS EM FORMATO DE STRINGS.
            downloadLinks.push(downloadUrl);

            //VAI DAR UM TOAST FALANDO QUE 1 ARQUIVO FOI FEITO UPLOAD COM SUCESSO!
            toast.success(`Arquivo ${i + 1} de ${files.length} enviado!`);

            //VAI SETAR UPLOADSUCESS COMO TRUE, JÁ QUE REALMENTE DEU CERTO.
            uploadSuccess = true;

            //SE DATA.STATUS NÃO FOR TRUE, VAI ACONTECER O SEGUINTE:
          } else {

            //SERÁ ENVIADO PARA O CONSOLE LOG ESSE ERRO ABAIXO:
            console.error("Erro ao enviar o arquivo:", data.error.message);
          }

          //SE DER FALHA NO ENVIO DA REQUISIÇÃO DO ANONFILES, VAI OCORRER O CONSOLE ABAIXO:
        } catch (error) {
          console.error("Erro ao enviar o arquivo:", error);
        }

        //VAI ITERAR O NÚMERO DE TENTATIVAS, POIS SE CHEGOU AQUI, É PORQUE DEU UM ERRO.
        attempts++;
      }

      //SE CHEGOU ATE AQUI E O UPLOAD NÃO TEVE SUCESSO, VAI DAR O TOAST ABAIXO: 
      if (!uploadSuccess) {
        toast.error(`Tentativas esgotadas para o arquivo ${i + 1}.`);
      }
    }

    //AQUI O ARRAY DE LINKS JÁ ESTARÁ PREENCHIDO, E SERÁ FEITO UM JOIN SEPARANDO POR UM GRANDE ESPAÇO, POIS ESTE É O MÉTODO DE ARMAZENAMENTO.
    const filesString = downloadLinks.join("                        "); // Espaços de caracteres para separar os links

    //AQUI ESTÁ SENDO DECLARADO UM NOVO CORPO DE REQUISIÇÃO COM O NOME DO CLIENTE E OS ARQUIVOS COMO SENDO UMA STRING QUE É PRODUTO DO ANTIGO ARRAY DE STRINGS + OS DADOS ANTERIORES.
    const requestBody = {
      client: serviceOrder.client,
      files: `${filesString}                        ${serviceOrder.files}`, // Adicionando os novos links e os links antigos
    };

    //AQUI É DECLARADO A URL DA REQUISIÃO QUE SERÁ FEITA, POIS COMO JÁ FOI FEITO O UPLOAD DE ARQUIVOS NO ANONFILES E JÁ RECEBEU OS LINKS DE DOWNLOAD, BASTA FAZER UMA REQUISIÇÃO NA API PARA ARMAZENAR ESTES NOVOS DADOS
    const requestUrl = `serviceOrders/${serviceOrder.id}`;

    //AQUI ELE TENTA FAZER O REQUEST PATCH PARA ALTERAR A SERVICE ORDER COM OS NOVOS DADOS
    try {
      const response = await api.patch(requestUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        SetShowFileModal();
        router.push(`/${serviceOrder.id}`);
      } else {
        toast.error("Ocorreu um erro ao adicionar os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao adicionar os arquivos:", error);
      toast.error("Ocorreu um erro ao adicionar os arquivos.");
    }

    //AQUI SETA COMO FALSE O UPLOADING, POIS JA ACABOU O LOOP DE UPLOADS
    setUploading(false);
  };

  return (
    <Modal>
      <h2>Adicionar Arquivos</h2>
      <input type="file" multiple onChange={onFileInputChange} />
      <div>
        <button onClick={SetShowFileModal} className="buttonCancel">
          Voltar
        </button>
        <button className="buttonSave" onClick={onFileFormSubmit} disabled={uploading}>
          {uploading ? (
            <>
              Enviando arquivos... Aguarde... Pode levar alguns minutos...
              <img
                src="https://media.giphy.com/media/r3xBH1FXWz0h55CVtj/giphy.gif"
                alt="Loading"
                style={{ width: "100%", borderRadius: "50%" }}
              />
            </>
          ) : (
            "Salvar"
          )}
        </button>
      </div>

      <style jsx>{`
        .buttonSave {
          font-size: ${uploading ? "6pt" : "inherit"};
        }
      `}</style>
    </Modal>
  );
};

export default AddFileFormModal;
