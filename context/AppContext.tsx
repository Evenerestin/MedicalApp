import React, { createContext, ReactNode, useContext, useReducer } from "react";
import {
  AppNotification,
  Appointment,
  AppSettings,
  GlucoseMeasurement,
  ICEProfile,
  Medication,
  MenstrualCycle,
  User,
  VitalMeasurement,
} from "../types";

export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  appointments: Appointment[];
  medications: Medication[];
  vitalMeasurements: VitalMeasurement[];
  glucoseMeasurements: GlucoseMeasurement[];
  menstrualCycles: MenstrualCycle[];
  iceProfile: ICEProfile | null;
  notifications: AppNotification[];

  settings: AppSettings;
}

const initialSettings: AppSettings = {
  userId: "",
  showMenstrualCalendar: true,
  notificationsEnabled: true,
  glucoseUnit: "mg/dL",
  theme: "light",
  language: "pl",
};

const initialState: AppState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,

  appointments: [],
  medications: [],
  vitalMeasurements: [],
  glucoseMeasurements: [],
  menstrualCycles: [],
  iceProfile: null,
  notifications: [],

  settings: initialSettings,
};

type AppAction =
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_AUTHENTICATED"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGOUT" }
  | { type: "SET_APPOINTMENTS"; payload: Appointment[] }
  | { type: "ADD_APPOINTMENT"; payload: Appointment }
  | { type: "UPDATE_APPOINTMENT"; payload: Appointment }
  | { type: "DELETE_APPOINTMENT"; payload: string }
  | { type: "SET_MEDICATIONS"; payload: Medication[] }
  | { type: "ADD_MEDICATION"; payload: Medication }
  | { type: "UPDATE_MEDICATION"; payload: Medication }
  | { type: "TOGGLE_MEDICATION_ACTIVE"; payload: string }
  | { type: "DELETE_MEDICATION"; payload: string }
  | { type: "SET_VITAL_MEASUREMENTS"; payload: VitalMeasurement[] }
  | { type: "ADD_VITAL_MEASUREMENT"; payload: VitalMeasurement }
  | { type: "SET_GLUCOSE_MEASUREMENTS"; payload: GlucoseMeasurement[] }
  | { type: "ADD_GLUCOSE_MEASUREMENT"; payload: GlucoseMeasurement }
  | { type: "UPDATE_GLUCOSE_MEASUREMENT"; payload: GlucoseMeasurement }
  | { type: "SET_MENSTRUAL_CYCLES"; payload: MenstrualCycle[] }
  | { type: "ADD_MENSTRUAL_CYCLE"; payload: MenstrualCycle }
  | { type: "UPDATE_MENSTRUAL_CYCLE"; payload: MenstrualCycle }
  | { type: "SET_ICE_PROFILE"; payload: ICEProfile | null }
  | { type: "UPDATE_ICE_PROFILE"; payload: ICEProfile }
  | { type: "SET_NOTIFICATIONS"; payload: AppNotification[] }
  | { type: "ADD_NOTIFICATION"; payload: AppNotification }
  | { type: "MARK_NOTIFICATION_READ"; payload: string }
  | { type: "MARK_ALL_NOTIFICATIONS_READ" }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AppSettings> };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "LOGOUT":
      return { ...initialState, isLoading: false };

    case "SET_APPOINTMENTS":
      return { ...state, appointments: action.payload };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "UPDATE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload.id ? action.payload : a,
        ),
      };
    case "DELETE_APPOINTMENT":
      return {
        ...state,
        appointments: state.appointments.filter((a) => a.id !== action.payload),
      };

    case "SET_MEDICATIONS":
      return { ...state, medications: action.payload };
    case "ADD_MEDICATION":
      return { ...state, medications: [...state.medications, action.payload] };
    case "UPDATE_MEDICATION":
      return {
        ...state,
        medications: state.medications.map((m) =>
          m.id === action.payload.id ? action.payload : m,
        ),
      };
    case "TOGGLE_MEDICATION_ACTIVE":
      return {
        ...state,
        medications: state.medications.map((m) =>
          m.id === action.payload ? { ...m, isActive: !m.isActive } : m,
        ),
      };
    case "DELETE_MEDICATION":
      return {
        ...state,
        medications: state.medications.filter((m) => m.id !== action.payload),
      };

    case "SET_VITAL_MEASUREMENTS":
      return { ...state, vitalMeasurements: action.payload };
    case "ADD_VITAL_MEASUREMENT":
      return {
        ...state,
        vitalMeasurements: [...state.vitalMeasurements, action.payload],
      };

    case "SET_GLUCOSE_MEASUREMENTS":
      return { ...state, glucoseMeasurements: action.payload };
    case "ADD_GLUCOSE_MEASUREMENT":
      return {
        ...state,
        glucoseMeasurements: [...state.glucoseMeasurements, action.payload],
      };
    case "UPDATE_GLUCOSE_MEASUREMENT":
      return {
        ...state,
        glucoseMeasurements: state.glucoseMeasurements.map((g) =>
          g.id === action.payload.id ? action.payload : g,
        ),
      };

    case "SET_MENSTRUAL_CYCLES":
      return { ...state, menstrualCycles: action.payload };
    case "ADD_MENSTRUAL_CYCLE":
      return {
        ...state,
        menstrualCycles: [...state.menstrualCycles, action.payload],
      };
    case "UPDATE_MENSTRUAL_CYCLE":
      return {
        ...state,
        menstrualCycles: state.menstrualCycles.map((c) =>
          c.id === action.payload.id ? action.payload : c,
        ),
      };

    case "SET_ICE_PROFILE":
      return { ...state, iceProfile: action.payload };
    case "UPDATE_ICE_PROFILE":
      return { ...state, iceProfile: action.payload };

    case "SET_NOTIFICATIONS":
      return { ...state, notifications: action.payload };
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.payload
            ? { ...n, isRead: true, readAt: new Date().toISOString() }
            : n,
        ),
      };
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({
          ...n,
          isRead: true,
          readAt: n.readAt || new Date().toISOString(),
        })),
      };

    case "UPDATE_SETTINGS":
      return { ...state, settings: { ...state.settings, ...action.payload } };

    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const useUser = () => {
  const { state } = useAppContext();
  return state.user;
};

export const useIsAuthenticated = () => {
  const { state } = useAppContext();
  return state.isAuthenticated;
};

export const useAppointments = () => {
  const { state } = useAppContext();
  return state.appointments;
};

export const useMedications = () => {
  const { state } = useAppContext();
  return state.medications;
};

export const useActiveMedications = () => {
  const { state } = useAppContext();
  return state.medications.filter((m) => m.isActive);
};

export const useVitalMeasurements = () => {
  const { state } = useAppContext();
  return state.vitalMeasurements;
};

export const useGlucoseMeasurements = () => {
  const { state } = useAppContext();
  return state.glucoseMeasurements;
};

export const useMenstrualCycles = () => {
  const { state } = useAppContext();
  return state.menstrualCycles;
};

export const useNotifications = () => {
  const { state } = useAppContext();
  return state.notifications;
};

export const useAppDispatch = () => {
  const { dispatch } = useAppContext();
  return dispatch;
};
export const useICEProfile = () => {
  const { state } = useAppContext();
  return state.iceProfile;
};

export const useSettings = () => {
  const { state } = useAppContext();
  return state.settings;
};
