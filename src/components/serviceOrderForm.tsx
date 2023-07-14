import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateServiceOrderFormBase } from "../styles/addServiceOrderForm";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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

  const router = useRouter()

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

    const result = await createServiceOrder(formData);

    console.log(result);

    if (result) {
      setUploading(true);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileFormData = new FormData();
        fileFormData.append("file", file);
  
        try {
          const response = await fetch("https://api.anonfiles.com/upload", {
            method: "POST",
            body: fileFormData,
          });
  
          const data = await response.json();
          const downloadUrl = data.data.file.url.full;
          console.log("Link de download:", downloadUrl);
  
          // Exibir a contagem do arquivo enviado
          toast.success(`Arquivo ${i + 1} de ${files.length} enviado!`);
        } catch (error) {
          console.error("Erro ao enviar o arquivo:", error);
        }
      }
  
      setUploading(false);
      toast.success("Todos os arquivos enviados!")
      router.push('/')
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

        <label>Instrução para arte:</label>
        <textarea placeholder="Digite aqui informações para que a arte seja feita" {...register("description")} />

        <label>Arquivos para arte:</label>
        <input
          type="file"
          multiple
          onChange={(event: any) => {
            const newFiles = Array.from(event.target.files) as File[];
            setFiles((prevState: any) => [...prevState, ...newFiles]);
          }}
        />

        <button type="submit" className="buttonCreateOrder" disabled={uploading}>
          {uploading ? "Enviando arquivos..." : "Criar"}
        </button>
      </form>
    </CreateServiceOrderFormBase>
  );
};

export default ServiceOrderForm;
