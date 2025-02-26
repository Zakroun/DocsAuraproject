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
      const doctor = state.doctors.find(
        (a) => a.id === action.payload.doctorId
      );
      if (!doctor) {
        console.error("Doctor not found");
        return;
      }

      const appointment = doctor.appointments.find(
        (a) => a.id === action.payload.appointmentId
      );
      if (!appointment) {
        console.error("Appointment not found");
        return;
      }
      appointment.status = action.payload.status;
    },
  },
});

export const { changeboard, changestatus } = DocsauraSlice.actions;
