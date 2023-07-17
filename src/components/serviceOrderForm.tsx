import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateServiceOrderFormBase } from "../styles/addServiceOrderForm";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import api from "@/services/api";
import { parseCookies } from "nookies";

interface ServiceOrderFormData {
  client: string;
  product: string;
  printType: string;
  description: string;
}

const ServiceOrderForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit } = useForm<any>();
  const { createServiceOrder } = useServiceOrder();
  const router = useRouter();

  const cookies = parseCookies();
  const token = cookies["printsquad.token"];

  const getDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const date = getDate();

  const onFormSubmit = async (formData: any) => {
    formData.date = date;
    formData.status = "AGUARDANDO ARTE";
    formData.cost = "R$ 0,00";
    formData.price = "R$ 0,00";
    formData.margin = "R$ 0,00";
    formData.files = null;
    formData.mockupImg = null;
    formData.description = formData.description + "|||"

    const result = await createServiceOrder(formData);

    if (result.success) {
      const serviceOrderId = result.serviceOrderId;

      if (files.length === 0) {
        // toast.success("Ordem de serviço criada com sucesso!");
        router.push(`/${result.serviceOrderId}`)
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
              uploadSuccess = true;
            } else {
              console.error("Erro ao enviar o arquivo:", data.error.message);
            }
          } catch (error) {
            console.error("Erro ao enviar o arquivo:", error);
          }

          attempts++;
        }

        if (uploadSuccess) {
          // Exibir a contagem do arquivo enviado
          toast.success(`Arquivo ${i + 1} de ${files.length} enviado!`);
        } else {
          toast.error(`Falha ao enviar o arquivo ${i + 1}. Tentativas esgotadas.`);
        }
      }

      const filesString = downloadLinks.join("                        "); // Espaços de caracteres para separar os links

      const requestBody = {
        client: formData.client,
        files: filesString,
      };

      const requestUrl = `serviceOrders/${serviceOrderId}`;

      try {
        const response = await api.patch(requestUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success("Todos os arquivos enviados e a requisição foi feita com sucesso!");
          router.push(`/${result.serviceOrderId}`)
        } else {
          toast.error("Ocorreu um erro ao fazer a requisição.");
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        toast.error("Ocorreu um erro ao fazer a requisição.");
      }

      setUploading(false);
    }


  };

  return (
    <CreateServiceOrderFormBase>
      <h2>Criar Ordem de Serviço</h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>Data:</label>
        <input type="text" value={date} disabled />

        <label>Cliente:</label>
        <input type="text" {...register("client")} placeholder="Digite o nome do cliente" />

        <label>Produto:</label>
        <select {...register("product")}>
          <option value="">Selecione o produto</option>
          <option value="CAMISETA BASICA MANGA CURTA">CAMISETA BASICA MANGA CURTA</option>
          <option value="CAMISETA BASICA MANGA COMPRIDA">CAMISETA BASICA MANGA COMPRIDA</option>
          <option value="CAMISETA BASICA MANGA CURTA">CAMISETA POLO MANGA CURTA</option>
          <option value="CAMISETA BASICA MANGA COMPRIDA">CAMISETA POLO MANGA COMPRIDA</option>
          <option value="CAMISETA RAGLAN MANGA CURTA">CAMISETA RAGLAN MANGA CURTA</option>
          <option value="CAMISETA RAGLAN MANGA COMPRIDA">CAMISETA RAGLAN MANGA COMPRIDA</option>
          <option value="CAMISETA REGATA">CAMISETA REGATA</option>
          <option value="CORTA VENTO RAGLAN">CORTA VENTO RAGLAN</option>
          <option value="WINDBANNER 1,5M">WINDBANNER 1,5M</option>
          <option value="WINDBANNER 2,5M">WINDBANNER 2,5M</option>
          <option value="WINDBANNER 3,2M">WINDBANNER 3,2M</option>
        </select>

        <label>Tipo de Arte:</label>
        <select {...register("printType")}>
          <option value="">Selecione o tipo de arte</option>
          <option value="ARTE NOVA">ARTE NOVA</option>
          <option value="REIMPRESSÃO">REIMPRESSÃO</option>
        </select>

        <label>Instrução:</label>
        <textarea placeholder="Digite aqui informações para que a arte seja feita" {...register("description")} />

        <label>Arquivos para arte:</label>
        <input
          type="file"
          multiple
          onChange={(event: any) => {
            const newFiles = Array.from(event.target.files) as File[];
            setFiles((prevState) => [...prevState, ...newFiles]);
          }}
        />

        <button type="submit" className="buttonCreateOrder" disabled={uploading}>
          {uploading ? (
            <>
              Enviando arquivos... Aguarde... Pode levar alguns minutos...
              <img src="https://media.giphy.com/media/r3xBH1FXWz0h55CVtj/giphy.gif" alt="Loading" style={{ width: "25%" , borderRadius: "50%"}} />
            </>
          ) : (
            "Criar"
          )}
        </button>
      </form>
    </CreateServiceOrderFormBase>
  );
};

export default ServiceOrderForm;
