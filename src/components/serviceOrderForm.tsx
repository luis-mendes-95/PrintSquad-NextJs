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
  const [loading, setLoading] = useState(false);
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
    
    setLoading(true);

    formData.date = date;
    formData.status = "AGUARDANDO ARTE";

    if (formData.printType === "RETRABALHO") {
      formData.cost = "0";
    }

    if (formData.printType === "TERCEIRIZADO") {
      formData.cost = "0";
    }

    if (formData.printType === "ARTE NOVA") {
      formData.cost = "40";
    }

    if (formData.printType === "REIMPRESSÃO") {
      formData.cost = "20";
    }


    formData.price = "R$ 0,00";
    formData.margin = "R$ 0,00";
    formData.files = null;
    formData.mockupImg = null;
    formData.description = formData.description + "|||";

    const result = await createServiceOrder(formData);

    if (result.success) {
      const serviceOrderId = result.serviceOrderId;

      if (files.length === 0) {
        // toast.success("Ordem de serviço criada com sucesso!");
        router.push(`/${result.serviceOrderId}`);
        return;
      }

      setUploading(true);

      const downloadLinks: string[] = [];

      const formDataFiles = new FormData();
      files.forEach((file: any) => {
        formDataFiles.append("files", file);
      });

      const response = await api.post("serviceOrders/upload", formDataFiles, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //TALVEZ DAQUI PRA BAIXO

      console.log(response.data);
      const filesString = response.data.join("                        "); // Espaços de caracteres para separar os links

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
          toast.success(
            "Todos os arquivos enviados e a requisição foi feita com sucesso!"
          );
          router.push(`/${result.serviceOrderId}`);
        } else {
          toast.error("Ocorreu um erro ao fazer a requisição.");
        }
      } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        toast.error("Ocorreu um erro ao fazer a requisição.");
      }

      setUploading(false);
      setLoading(false);
    }
  };

  return (
    <CreateServiceOrderFormBase>
      <h2>Criar Ordem de Serviço</h2>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label>Data:</label>
        <input type="text" value={date} disabled />

        <label style={{ fontSize: "25pt" }}>Cliente:</label>
        <input
          type="text"
          {...register("client")}
          placeholder="Digite o nome do cliente"
        />

        <label style={{ fontSize: "25pt" }}>Produto:</label>
        <select {...register("product")}>
          <option value="">Selecione o produto</option>
          <option value="BANDEIRA QUADRADA">BANDEIRA QUADRADA</option>
          <option value="CAMISETA BASICA MANGA COMPRIDA">
            CAMISETA BASICA MANGA COMPRIDA
          </option>
          <option value="CAMISETA BASICA MANGA CURTA">
            CAMISETA BASICA MANGA CURTA
          </option>
          <option value="CAMISETA POLO MANGA COMPRIDA">
            CAMISETA POLO MANGA COMPRIDA
          </option>
          <option value="CAMISETA POLO MANGA CURTA">
            CAMISETA POLO MANGA CURTA
          </option>
          <option value="CAMISETA RAGLAN MANGA COMPRIDA">
            CAMISETA RAGLAN MANGA COMPRIDA
          </option>
          <option value="CAMISETA RAGLAN MANGA CURTA">
            CAMISETA RAGLAN MANGA CURTA
          </option>
          <option value="CAMISETA REGATA">CAMISETA REGATA</option>
          <option value="CORTA VENTO RAGLAN">CORTA VENTO RAGLAN</option>
          <option value="WINDBANNER 1,5M">WINDBANNER 1,5M</option>
          <option value="WINDBANNER 2,5M">WINDBANNER 2,5M</option>
          <option value="WINDBANNER 3,2M">WINDBANNER 3,2M</option>
          <option value="OUTRO">OUTRO</option>
        </select>

        <label style={{ fontSize: "25pt" }}>Tipo de Arte:</label>
        <select {...register("printType")}>
          <option value="">Selecione o tipo de arte</option>
          <option value="ARTE NOVA">ARTE NOVA</option>
          <option value="REIMPRESSÃO">REIMPRESSÃO</option>
          <option value="RETRABALHO">RETRABALHO</option>
          <option value="TERCEIRIZADO">TERCEIRIZADO</option>
        </select>

        <label style={{ fontSize: "25pt" }}>Instrução:</label>
        <textarea
          placeholder="Digite aqui informações para que a arte seja feita"
          {...register("description")}
        />

        {!uploading && (
          <>
            <label style={{ fontSize: "25pt" }}>Arquivos para arte:</label>
            <input
              style={{
                margin: "20px 0",
                fontWeight: "bold",
                backgroundColor: "lightgray",
                borderRadius: "18px",
                boxShadow: "2pt 2pt 5pt black",
                padding: "40px 10px 60px",
              }}
              type="file"
              multiple
              onChange={(event: any) => {
                const newFiles = Array.from(event.target.files) as File[];
                setFiles((prevState) => [...prevState, ...newFiles]);
              }}
            />
          </>
        )}

        {
          uploading &&
          <>
          <p style={{width:"100%", textAlign:"center", fontWeight:"bold", fontFamily:"sans-serif", fontSize:"15pt"}}>Aguarde os arquivos serem enviados.</p>
          <img
            src="https://media.giphy.com/media/r3xBH1FXWz0h55CVtj/giphy.gif"
            alt="Loading"
            style={{ margin:"-80px 0 0 0", width: "100%", borderRadius: "90%", transform:"scale(0.5)" }}
          />
    </>
        }

        <button
          type="submit"
          className="buttonCreateOrder"
          disabled={loading}
          style={{fontSize:"25pt"}}
        >
          Criar
        </button>
      </form>
    </CreateServiceOrderFormBase>
  );
};

export default ServiceOrderForm;
