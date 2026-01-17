/**
 * Database Module - Main Entry Point
 *
 * This module provides a complete SQLite database solution for the medical app.
 *
 * ## Quick Start
 *
 * ```typescript
 * import { DatabaseService } from '@/lib/database';
 *
 * // Initialize database on app start
 * await DatabaseService.initializeDatabase();
 *
 * // Use the service
 * const medications = await DatabaseService.getActiveMedications(userId);
 * ```
 *
 * ## Modular Services (Recommended)
 *
 * For better organization, import specialized services:
 *
 * ```typescript
 * import {
 *   MedicationService,
 *   AppointmentService,
 *   GlucoseService
 * } from '@/lib/database/services';
 *
 * // More focused and readable
 * const meds = await MedicationService.getActive(userId);
 * const appointments = await AppointmentService.getToday(userId);
 * const glucose = await GlucoseService.getAverage(userId, 7);
 * ```
 *
 * ## Architecture
 *
 * - **DatabaseManager**: Low-level SQLite connection and query execution
 * - **Repositories**: Data access layer (CRUD operations per entity)
 * - **Services**: Business logic layer (specialized methods per entity)
 * - **DatabaseService**: Facade for backwards compatibility
 */

// Main facade service (backwards compatible)
export { DatabaseService } from "./DatabaseService";

// Database manager (low-level access)
export { DatabaseManager, dbManager } from "./DatabaseManager";

// Specialized services (recommended for new code)
export {
  AllergyService,
  AppointmentService,
  GlucoseService,
  MedicationService,
  VitalsService,
} from "./services";

// Repositories (for advanced use cases)
export {
  AllergyRepository,
  AppointmentRepository,
  GlucoseRepository,
  MedicationRepository,
  VitalsRepository,
} from "./repositories";

// Schema definitions
export * from "./schema";

/**
 * Usage Examples:
 *
 * ## Example 1: Using DatabaseService (Simple)
 * ```typescript
 * import { DatabaseService } from '@/lib/database';
 *
 * const meds = await DatabaseService.getActiveMedications(userId);
 * await DatabaseService.addMedication(userId, medicationData);
 * ```
 *
 * ## Example 2: Using Specialized Services (Recommended)
 * ```typescript
 * import { MedicationService } from '@/lib/database/services';
 *
 * // More methods available
 * const active = await MedicationService.getActive(userId);
 * const byFrequency = await MedicationService.getByFrequency(userId, 'twice_daily');
 * const dueNow = await MedicationService.getMedicationsDueNow(userId, '08:00');
 * ```
 *
 * ## Example 3: Using Multiple Services
 * ```typescript
 * import {
 *   MedicationService,
 *   AppointmentService,
 *   AllergyService
 * } from '@/lib/database/services';
 *
 * const [medications, appointments, allergies] = await Promise.all([
 *   MedicationService.getActive(userId),
 *   AppointmentService.getToday(userId),
 *   AllergyService.getCritical(userId),
 * ]);
 * ```
 */
