import { useState } from "react";
import { useServiceOrder } from "@/contexts/serviceOrderContext";
import Modal from "./modal";
import { serviceOrderData } from "@/schemas/serviceOrder.schema";
import { toast } from "react-toastify";
import api from "@/services/api";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

interface iFinancesProps {
  serviceOrders: serviceOrderData[];
}

const FinancesModal = ({ serviceOrders }: iFinancesProps) => {

  let orders = serviceOrders

  let total = 0

  for (const order of orders) {
    total += parseInt(order.cost)
    console.log(order.cost)
  }

  const { designerPayables, showFinancesButton, setShowFinances } = useServiceOrder();

  const router = useRouter();

  const cookies = parseCookies();

  const token = cookies["printsquad.token"];

  return (
    <Modal>
      <div>
        <h2 style={{ fontSize: "14pt", fontFamily: "sans-serif" }}>A PAGAR PARA O DESIGNER:</h2>
        <button onClick={setShowFinances} style={{ backgroundColor: "red", color: "white", fontWeight: "bold" }}>X</button>


      </div>

      <p style={{ fontSize: "14pt", fontFamily: "sans-serif", padding: "10px" }}>R$ {total}</p>

      <h3 style={{ fontSize: "14pt", fontFamily: "sans-serif", padding: "10px" }}>Referências:</h3>
      <ul style={{maxHeight:"300px", overflow:"scroll", backgroundColor:"lightgray"}}>
        {
          orders.map((order: any) => {
            return (
              <li key={Math.random()}
              style={{fontFamily:"sans-serif",backgroundColor:"orange", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center",}}>
                <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                  <h4 style={{ textAlign:"left", margin:"0 0 0 10px"}}>{order.client}</h4>
                  <p style={{fontWeight:"bold", color:"white", textShadow:"1px 1px 2px black"}}>{order.date}</p>
                </div>

                <div style={{ display: "flex", width: "100%", justifyContent: "space-around" }}>
                  <p>{order.printType}</p>
                  <p>Custo: R$ {order.cost}</p>
                </div>
                <button onClick={() => { router.push(`/${order.id}`) }}
                  style={{ fontWeight:"bold", backgroundColor:"brown", color:"white", width: "200px", height: "30px", margin: "5px 0" }}>Ver Ordem</button>
              </li>
            )
          })
        }
      </ul>


    </Modal>
  );
};

export default FinancesModal;
