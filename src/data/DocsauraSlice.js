import {
  visitors,
  doctors,
  clinics,
  laboratories,
  specializedDoctors,
  cities,
} from "./data";
import { createSlice } from "@reduxjs/toolkit";

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
  },
  reducers: {
    changeboard: (state, action) => {
      state.currentboard = action.payload;
    },
    changestatus: (state, action) => {
      const { doctorId, appointmentId, role, status } = action.payload;
      console.log(action.payload)
      let entity;
      switch (role) {
        case 'doctor':
          entity = state.doctors.find(a => a.id === doctorId);
          break;
        case 'clinic':
          entity = state.clinics.find(a => a.id === doctorId);
          break;
        case 'laboratori':
          entity = state.laboratories.find(a => a.id === doctorId);
          break;
        case 'patient':
          entity = state.visitors.find(a => a.id === doctorId); // Assuming patients are stored in visitors
          break;
        default:
          console.error("Invalid role");
          return;
      }

      if (!entity) {
        console.error(`${role.charAt(0).toUpperCase() + role.slice(1)} not found`);
        return;
      }

      const appointment = entity.appointments.find(a => a.id === appointmentId);
      if (!appointment) {
        console.error("Appointment not found");
        return;
      }
      appointment.status = status.toLowerCase();
    },
  },
});

export const { changeboard, changestatus } = DocsauraSlice.actions;
