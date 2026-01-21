export const SCHEMA = {
  users: `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      firstName TEXT,
      lastName TEXT,
      birthDate TEXT,
      bloodType TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `,

  appointments: `
    CREATE TABLE IF NOT EXISTS appointments (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      doctorName TEXT,
      address TEXT,
      reminders TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  medications: `
    CREATE TABLE IF NOT EXISTS medications (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      dosage TEXT NOT NULL,
      frequency TEXT NOT NULL,
      route TEXT,
      reason TEXT,
      startDate TEXT,
      endDate TEXT,
      active INTEGER DEFAULT 1,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  glucoseMeasurements: `
    CREATE TABLE IF NOT EXISTS glucose_measurements (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      value REAL NOT NULL,
      unit TEXT NOT NULL,
      mealTime TEXT,
      insulinDose REAL,
      notes TEXT,
      timestamp TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  vitalMeasurements: `
    CREATE TABLE IF NOT EXISTS vital_measurements (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      type TEXT NOT NULL,
      value REAL NOT NULL,
      secondaryValue REAL,
      tertiaryValue REAL,
      unit TEXT,
      notes TEXT,
      timestamp TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  menstrualCycles: `
    CREATE TABLE IF NOT EXISTS menstrual_cycles (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT,
      cycleDuration INTEGER,
      flowIntensity TEXT,
      symptoms TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  allergies: `
    CREATE TABLE IF NOT EXISTS allergies (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      allergen TEXT NOT NULL,
      category TEXT NOT NULL,
      severity TEXT NOT NULL,
      symptoms TEXT,
      notes TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  iceProfile: `
    CREATE TABLE IF NOT EXISTS ice_profile (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL UNIQUE,
      bloodType TEXT,
      organDonor INTEGER DEFAULT 0,
      medicalConditions TEXT,
      currentMedications TEXT,
      allergies TEXT,
      emergencyContact1Name TEXT,
      emergencyContact1Phone TEXT,
      emergencyContact1Relation TEXT,
      emergencyContact2Name TEXT,
      emergencyContact2Phone TEXT,
      emergencyContact2Relation TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  environmentalAllergies: `
    CREATE TABLE IF NOT EXISTS environmental_allergies (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      allergen TEXT NOT NULL,
      intensity INTEGER,
      symptoms TEXT,
      date TEXT NOT NULL,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,

  appNotifications: `
    CREATE TABLE IF NOT EXISTS app_notifications (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT,
      type TEXT,
      relatedId TEXT,
      read INTEGER DEFAULT 0,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    )
  `,
};

export const INDICES = [
  "CREATE INDEX IF NOT EXISTS idx_appointments_userId ON appointments(userId)",
  "CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date)",
  "CREATE INDEX IF NOT EXISTS idx_medications_userId ON medications(userId)",
  "CREATE INDEX IF NOT EXISTS idx_medications_active ON medications(active)",
  "CREATE INDEX IF NOT EXISTS idx_glucose_userId ON glucose_measurements(userId)",
  "CREATE INDEX IF NOT EXISTS idx_glucose_timestamp ON glucose_measurements(timestamp)",
  "CREATE INDEX IF NOT EXISTS idx_vitals_userId ON vital_measurements(userId)",
  "CREATE INDEX IF NOT EXISTS idx_vitals_timestamp ON vital_measurements(timestamp)",
  "CREATE INDEX IF NOT EXISTS idx_menstrual_userId ON menstrual_cycles(userId)",
  "CREATE INDEX IF NOT EXISTS idx_allergies_userId ON allergies(userId)",
  "CREATE INDEX IF NOT EXISTS idx_ice_userId ON ice_profile(userId)",
  "CREATE INDEX IF NOT EXISTS idx_env_allergies_userId ON environmental_allergies(userId)",
  "CREATE INDEX IF NOT EXISTS idx_notifications_userId ON app_notifications(userId)",
  "CREATE INDEX IF NOT EXISTS idx_notifications_read ON app_notifications(read)",
];

export const DB_VERSION = 1;
