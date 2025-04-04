import {
  visitors,
  doctors,
  clinics,
  laboratories,
  specializedDoctors,
  cities,
} from "./data";
import { createSlice } from "@reduxjs/toolkit";
import { conversations } from "./data";
export const DocsauraSlice = createSlice({
  name: "DocsAura",
  initialState: {
    visitors: visitors,
    doctors: doctors,
    clinics: clinics,
    laboratories: laboratories,
    specializedDoctors: specializedDoctors,
    cities: cities,
    currentboard: "home",
    conversations: conversations,
    menu : false,
    currentpage : 'home',
  },
  reducers: {
    changeboard: (state, action) => {
      console.log(action.payload);
      state.currentboard = action.payload;
    },
    changestatus: (state, action) => {
      const { doctorId, appointmentId, role, status } = action.payload;
      let entity;
      switch (role) {
        case "doctor":
          entity = state.doctors.find((a) => a.id === doctorId);
          break;
        case "clinic":
          entity = state.clinics.find((a) => a.id === doctorId);
          break;
        case "laboratori":
          entity = state.laboratories.find((a) => a.id === doctorId);
          break;
        case "patient":
          entity = state.visitors.find((a) => a.id === doctorId); // Assuming patients are stored in visitors
          break;
        default:
          console.error("Invalid role");
          return;
      }

      if (!entity) {
        console.error(
          `${role.charAt(0).toUpperCase() + role.slice(1)} not found`
        );
        return;
      }

      const appointment = entity.appointments.find(
        (a) => a.id === appointmentId
      );
      if (!appointment) {
        console.error("Appointment not found");
        return;
      }
      appointment.status = status.toLowerCase();
    },
    Sent: (state, action) => {
      const { type, content, name, fileName } = action.payload;
      console.log(action.payload);

      const conversation = state.conversations.find(
        (conv) => conv.name.toLowerCase().trim() === name.toLowerCase().trim()
      );

      if (!conversation) {
        console.error("Conversation not found");
        return;
      }

      // Trouver le dernier idMessage et l'incrémenter
      const lastMessage =
        conversation.messages.length > 0
          ? conversation.messages[conversation.messages.length - 1]
          : null;

      const newIdMessage = lastMessage ? lastMessage.idMessage + 1 : 1;

      const newMessage = {
        idMessage: newIdMessage, // Ajout de l'ID unique
        type: type,
        content: content,
        sender: "You",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        read: false,
      };

      if (type === "document" && fileName) {
        newMessage.fileName = fileName;
      }

      conversation.messages.push(newMessage);
      conversation.message = content;
      conversation.time = newMessage.time;
    },
    deletemessage: (state, action) => {
      const { idconv, idmessage } = action.payload;
      console.log(action.payload)
      console.log(state.conversations);
      const conversation = state.conversations.find(
        (conv) => conv.id === idconv
      );
      if (conversation) {
        conversation.messages = conversation.messages.filter(
          (message) => message.idMessage !== idmessage
        );
        console.log("suucccccccccc");
      }
    },
    Menu : (state, action) =>{
      state.menu = !state.menu
    },
    changecurrentpage : (state, action) => {
      state.currentpage = action.payload
    }
  },
});

export const {changecurrentpage, changeboard, changestatus, Sent, deletemessage ,Menu } =
  DocsauraSlice.actions;
