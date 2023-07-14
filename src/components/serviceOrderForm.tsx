import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateServiceOrderFormBase } from "../styles/addServiceOrderForm";
import { useServiceOrder } from "@/contexts/serviceOrderContext";

const ServiceOrderForm = () => {

  const [files, setFiles] = useState<any>([]);
  const { register, handleSubmit } = useForm<any>();
  const { createServiceOrder } = useServiceOrder()

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
    formData.status = "AGUARDANDO ARTE"
    formData.cost = "R$ 0,00";
    formData.price = "R$ 0,00";
    formData.margin = "R$ 0,00";
    formData.files = null;
    formData.mockupImg = null;
    createServiceOrder(formData);
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
            const newFiles: any = Array.from(event.target.files);
            setFiles((prevState: any) => [...prevState, ...newFiles]);
          }}
        />

        <button type="submit">Criar</button>
      </form>
    </CreateServiceOrderFormBase>
  );
};

export default ServiceOrderForm;
