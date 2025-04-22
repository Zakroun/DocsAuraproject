import {
  visitors,
  doctors,
  clinics,
  laboratories,
  specializedDoctors,
  cities,
  userDataYearly,
} from "./data";
import { createSlice } from "@reduxjs/toolkit";
import { conversations } from "./data";
import { adminUsers } from "./data";
import { complaints } from "./data";
export const DocsauraSlice = createSlice({
  name: "DocsAura",
  initialState: {
    visitors: visitors,
    doctors: doctors,
    clinics: clinics,
    laboratories: laboratories,
    specializedDoctors: specializedDoctors,
    profile: true,
    cities: cities,
    currentboard: "home",
    conversations: conversations,
    menu: false,
    currentpage: "home",
    adminUsers: adminUsers,
    complaints: complaints,
    userDataYearly:userDataYearly,
    requests: [
      {
        id: 8,
        role: "doctor",
        status: "pending",
        address: "N 2 hay saidia V N meknes",
        amoCode: "7777777",
        cnssCode: "",
        email: "rouanezakaria052@gmail.com",
        medicalOrderNumber: "999999",
        specialty: "Gastroenterology",
        date: "2023-03-25"
      },
      {
        id: 9,
        role: "clinic",
        status: "pending",
        address: "10 Rue Al Qods, Rabat",
        taxId: "456789",
        clinicId: "CLN123",
        email: "clinic@example.com",
        date: "2024-07-11"
      },
      {
        id: 10,
        role: "laboratory",
        status: "pending",
        address: "Zone Industrielle, Fès",
        taxId: "LAB456",
        patente: "PT98765",
        email: "lab@example.com",
        date: "2025-01-17"
      },
    ]
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
      const lastMessage =
        conversation.messages.length > 0
          ? conversation.messages[conversation.messages.length - 1]
          : null;

      const newIdMessage = lastMessage ? lastMessage.idMessage + 1 : 1;

      const newMessage = {
        idMessage: newIdMessage,
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
      console.log(action.payload);
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
    Menu: (state, action) => {
      state.menu = !state.menu;
    },
    changecurrentpage: (state, action) => {
      state.currentpage = action.payload;
    },
    changeprofile: (state, action) => {
      state.profile = action.payload;
    },
    Addrequest: (state, action) => {
      console.log(action.payload);
      state.requests.push(action.payload);
    },
    acceptRequest: (state, action) => {
      const request = state.requests.find((req) => req.id === action.payload.id);
      if (request) {
        request.Verified = true;
        request.status = "accepted";
      }
      console.log(action.payload);
      if (action.payload.role === "doctor") {
        const doctor = state.doctors.find((doc) => doc.id === request.id);
        if (doctor) {
          doctor.Verified = true;
        }
      } else if (action.payload.role === "clinic") {
        const clinic = state.clinics.find((doc) => doc.id === action.payload.id);
        if (clinic) {
          clinic.Verified = true;
        }
      } else if (action.payload.role === "laboratory") {
        const laboratory = state.laboratories.find(
          (doc) => doc.id === action.payload.id
        );
        if (laboratory) {
          laboratory.Verified = true;
        }
      } else if (action.payload.role === "patient") {
        const visitor = state.visitors.find((doc) => doc.id === action.payload.id);
        if (visitor) {
          visitor.Verified = true;
        }
      }
    },
    rejectRequest: (state, action) => {
      const request = state.requests.find((req) => req.id === action.payload.id);
      if (request) {
        request.Verified = false;
        request.status = "rejected";
      }
      if (action.payload.role === "doctor") {
        const doctor = state.doctors.find((doc) => doc.id === action.payload.id);
        if (doctor) {
          doctor.Verified = false;
        }
      } else if (action.payload.role === "clinic") {
        const clinic = state.clinics.find((doc) => doc.id === action.payload.id);
        if (clinic) {
          clinic.Verified = false;
        }
      } else if (action.payload.role === "laboratory") {
        const laboratory = state.laboratories.find(
          (doc) => doc.id === action.payload.id
        );
        if (laboratory) {
          laboratory.Verified = false;
        }
      } else if (action.payload.role === "patient") {
        const visitor = state.visitors.find((doc) => doc.id === action.payload.id);
        if (visitor) {
          visitor.Verified = false;
        }
      }
    },
  },
});

export const {
  changecurrentpage,
  changeboard,
  changestatus,
  Sent,
  deletemessage,
  Menu,
  changeprofile,
  Addrequest,
  acceptRequest,
  rejectRequest,
} = DocsauraSlice.actions;
