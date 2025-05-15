import {
  // visitors,
  // doctors,
  // clinics,
  // laboratories,
  specializedDoctors,
  cities,
  userDataYearly,
  requests,
} from "./data";
import filesData from "../data/data";
import { createSlice } from "@reduxjs/toolkit";
import { conversations } from "./data";
// import { adminUsers } from "./data";
import { complaints } from "./data";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
// Async thunks for fetching users
// Add this at the top of your autslice.js file
const API_BASE_URL = "http://localhost:8000/api/v1";
const API_BASE_URL2 = "http://localhost:8000/api";
export const fetchVisitors = createAsyncThunk(
  "users/fetchVisitors",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/users/patient`);
    return response.data;
  }
);

export const fetchDoctors = createAsyncThunk("users/fetchDoctors", async () => {
  const response = await axios.get(`${API_BASE_URL}/users/doctor`);
  return response.data;
});

export const fetchClinics = createAsyncThunk("users/fetchClinics", async () => {
  const response = await axios.get(`${API_BASE_URL}/users/clinic`);
  return response.data;
});

export const fetchLaboratories = createAsyncThunk(
  "users/fetchLaboratories",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/users/laboratory`);
    return response.data;
  }
);

export const fetchAdminUsers = createAsyncThunk(
  "users/fetchAdminUsers",
  async () => {
    const response = await axios.get(`${API_BASE_URL}/admin-users`);
    return response.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { dispatch }) => {
    await dispatch(fetchVisitors());
    await dispatch(fetchDoctors());
    await dispatch(fetchClinics());
    await dispatch(fetchLaboratories());
    await dispatch(fetchAdminUsers());
    return true;
  }
);
// addAppointment slice api
export const addAppointment = createAsyncThunk(
  "appointments/add",
  async (appointment, { rejectWithValue }) => {
    console.log(appointment);
    try {
      // Only modify imageP if not a lab appointment
      const requestData = {
        ...appointment,
        imageP: appointment.id_labo ? appointment.imageP : null,
      };

      const response = await axios.post(
        `${API_BASE_URL2}/appointments`,
        requestData
      );
      return response.data;
    } catch (error) {
      // Detailed error logging
      // console.group('Appointment Creation Failed');
      // console.error('Full error object:', error);

      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        console.error("Response data:", error.response.data);

        // Special handling for 422 validation errors
        if (error.response.status === 422) {
          console.error("Validation errors:", error.response.data.errors);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request
        console.error("Request setup error:", error.message);
      }

      console.groupEnd();

      // return rejectWithValue({
      //   message: error.response?.data?.message || 'Appointment creation failed',
      //   errors: error.response?.data?.errors || {},
      //   status: error.response?.status,
      //   originalError: { // Include original error details for debugging
      //     config: error.config,
      //     request: error.request,
      //     response: error.response
      //   }
      // });
    }
  }
);
// Add this with your other async thunks
export const fetchUserAppointments = createAsyncThunk(
  "appointments/fetchUserAppointments",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL2}/appointments/${id}/${role}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const DocsauraSlice = createSlice({
  name: "DocsAura",
  initialState: {
    // Users
    visitors: [],
    doctors: [],
    clinics: [],
    laboratories: [],
    adminUsers: [],
    appointments: [],
    appointmentsLoading: false,
    appointmentsError: null,
    // states
    specializedDoctors: specializedDoctors,
    profile: false,
    cities: cities,
    currentboard: "home",
    conversations: conversations,
    menu: false,
    currentpage: "home",
    complaints: complaints,
    userDataYearly: userDataYearly,
    files: filesData.files,
    activity: filesData.activity,
    requests: requests,
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
        case "laboratory":
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
      const request = state.requests.find(
        (req) => req.id === action.payload.id
      );
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
        const clinic = state.clinics.find(
          (doc) => doc.id === action.payload.id
        );
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
        const visitor = state.visitors.find(
          (doc) => doc.id === action.payload.id
        );
        if (visitor) {
          visitor.Verified = true;
        }
      }
    },
    rejectRequest: (state, action) => {
      const request = state.requests.find(
        (req) => req.id === action.payload.id
      );
      if (request) {
        request.Verified = false;
        request.status = "rejected";
      }
      if (action.payload.role === "doctor") {
        const doctor = state.doctors.find(
          (doc) => doc.id === action.payload.id
        );
        if (doctor) {
          doctor.Verified = false;
        }
      } else if (action.payload.role === "clinic") {
        const clinic = state.clinics.find(
          (doc) => doc.id === action.payload.id
        );
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
        const visitor = state.visitors.find(
          (doc) => doc.id === action.payload.id
        );
        if (visitor) {
          visitor.Verified = false;
        }
      }
    },
    Deletecomplaint: (state, action) => {
      const complaintId = action.payload;
      state.complaints = state.complaints.filter(
        (complaint) => complaint.id !== complaintId
      );
    },
    // AddAppointemnt: (state, action) => {
    //   const { role, id, appointment } = action.payload;
    //   console.log(action.payload);
    //   let entity;
    //   switch (role) {
    //     case "doctor":
    //       entity = state.doctors.find((doc) => doc.id === id);
    //       break;
    //     case "clinic":
    //       entity = state.clinics.find((clinic) => clinic.id === id);
    //       break;
    //     case "laboratory":
    //       entity = state.laboratories.find((lab) => lab.id === id);
    //       break;
    //     case "patient":
    //       entity = state.visitors.find((visitor) => visitor.id === id);
    //       break;
    //     default:
    //       console.error("Invalid role");
    //       return;
    //   }

    //   if (!entity) {
    //     console.error(`${role} not found with id ${id}`);
    //     return;
    //   }

    //   if (!entity.appointments) {
    //     entity.appointments = [];
    //   }

    //   entity.appointments.push(appointment);
    //   // console.log(`Appointment added to ${role} with id ${id}:`, appointment);
    //   // console.log("Updated appointments:", entity.appointments);
    // },
    addFile: (state, action) => {
      state.files.push(action.payload);
      state.activity.push(`File "${action.payload.name}" uploaded`);
    },
    deleteFiles: (state, action) => {
      state.files = state.files.filter(
        (file) => !action.payload.includes(file.name)
      );
      state.activity.push(`Deleted ${action.payload.length} files`);
    },
  },
  extraReducers: (builder) => {
    builder
      // Visitors
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.visitors = action.payload;
        state.loading = false;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Doctors
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.loading = false;
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Clinics
      .addCase(fetchClinics.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClinics.fulfilled, (state, action) => {
        state.clinics = action.payload;
        state.loading = false;
      })
      .addCase(fetchClinics.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Laboratories
      .addCase(fetchLaboratories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLaboratories.fulfilled, (state, action) => {
        state.laboratories = action.payload;
        state.loading = false;
      })
      .addCase(fetchLaboratories.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // Admin Users
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.adminUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      // addAppointment Case builder
      .addCase(addAppointment.fulfilled, (state, action) => {
        const appointment = action.payload.data; // The created appointment from API

        // Determine which entity this appointment belongs to
        if (appointment.id_doctor) {
          const doctor = state.doctors.find(
            (doc) => doc.id === appointment.id_doctor
          );
          if (doctor) {
            if (!doctor.appointments) doctor.appointments = [];
            doctor.appointments.push(appointment);
          }
        } else if (appointment.id_clinic) {
          const clinic = state.clinics.find(
            (cli) => cli.id === appointment.id_clinic
          );
          if (clinic) {
            if (!clinic.appointments) clinic.appointments = [];
            clinic.appointments.push(appointment);
          }
        } else if (appointment.id_labo) {
          const lab = state.laboratories.find(
            (lab) => lab.id === appointment.id_labo
          );
          if (lab) {
            if (!lab.appointments) lab.appointments = [];
            lab.appointments.push(appointment);
          }
        } else {
          // console.error(
          //   "Appointment doesn't belong to any entity:",
          //   appointment
          // );
        }
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to create appointment";
        state.validationErrors = action.payload?.errors || {}; // Store validation errors
      })
      // appointemnt get
      .addCase(fetchUserAppointments.pending, (state) => {
        state.appointmentsLoading = true;
        state.appointmentsError = null;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.appointments = action.payload.data;
        state.appointmentsLoading = false;
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.appointmentsError = action.payload;
        state.appointmentsLoading = false;
      });
  },
});

// Export all your actions
export const {
  changeboard,
  changestatus,
  Sent,
  deletemessage,
  Menu,
  changecurrentpage,
  changeprofile,
  Addrequest,
  acceptRequest,
  rejectRequest,
  Deletecomplaint,
  //AddAppointemnt,
  addFile,
  deleteFiles,
} = DocsauraSlice.actions;

// Export the reducer
export default DocsauraSlice;
