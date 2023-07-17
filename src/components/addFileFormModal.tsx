import { useState } from "react";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface iCardServiceOrderProps {
  serviceOrder: serviceOrderData;
}

const AddFileFormModal = ({ serviceOrder }: iCardServiceOrderProps) => {
  const { SetShowFileModal } = useServiceOrder();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies["printsquad.token"];

  const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files as FileList;
    const filesArray = Array.from(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...filesArray]);
  };

  const onFileFormSubmit = async () => {
    if (files.length === 0) {
      toast.error("Selecione pelo menos um arquivo.");
      return;
    }

    setUploading(true);

    const downloadLinks: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileFormData = new FormData();
      fileFormData.append("file", file);

      let uploadSuccess = false;
      let attempts = 0;

      while (!uploadSuccess && attempts < 3) {
        try {
          const response = await api.post("https://api.anonfiles.com/upload", fileFormData);
          const data = response.data;

          if (data.status === true) {
            const downloadUrl = data.data.file.url.full;
            downloadLinks.push(downloadUrl);
            toast.success(`Arquivo ${i + 1} de ${files.length} enviado!`);
            uploadSuccess = true;
          } else {
            console.error("Erro ao enviar o arquivo:", data.error.message);
          }
        } catch (error) {
          console.error("Erro ao enviar o arquivo:", error);
        }

        attempts++;
      }

      if (!uploadSuccess) {
        toast.error(`Tentativas esgotadas para o arquivo ${i + 1}.`);
      }
    }

    const filesString = downloadLinks.join("                        "); // Espaços de caracteres para separar os links

    const requestBody = {
      client: serviceOrder.client,
      files: `${filesString}                        ${serviceOrder.files}`, // Adicionando os novos links e os links antigos
    };

    const requestUrl = `serviceOrders/${serviceOrder.id}`;

    try {
      const response = await api.patch(requestUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success("Arquivos adicionados com sucesso!");
        SetShowFileModal();
        router.push(`/${serviceOrder.id}`);
      } else {
        toast.error("Ocorreu um erro ao adicionar os arquivos.");
      }
    } catch (error) {
      console.error("Erro ao adicionar os arquivos:", error);
      toast.error("Ocorreu um erro ao adicionar os arquivos.");
    }

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
