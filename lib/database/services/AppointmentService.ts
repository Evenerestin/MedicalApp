/**
 * Appointment Service
 * Handles all appointment-related database operations
 */

import { Appointment } from "../../../types";
import { AppointmentRepository } from "../repositories";

export class AppointmentService {
  /**
   * Create a new appointment
   */
  static async create(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">
  ): Promise<Appointment> {
    return await AppointmentRepository.create(userId, data);
  }

  /**
   * Get all appointments for a user
   */
  static async getAll(userId: string): Promise<Appointment[]> {
    return await AppointmentRepository.getByUserId(userId);
  }

  /**
   * Get upcoming appointments
   */
  static async getUpcoming(userId: string): Promise<Appointment[]> {
    return await AppointmentRepository.getUpcoming(userId);
  }

  /**
   * Get past appointments
   */
  static async getPast(userId: string): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    const now = new Date().toISOString();
    return all.filter((apt) => apt.date < now);
  }

  /**
   * Get a single appointment by ID
   */
  static async getById(id: string): Promise<Appointment | null> {
    return await AppointmentRepository.getById(id);
  }

  /**
   * Update an existing appointment
   */
  static async update(
    id: string,
    data: Partial<Omit<Appointment, "id" | "userId" | "createdAt">>
  ): Promise<Appointment> {
    return await AppointmentRepository.update(id, data);
  }

  /**
   * Delete an appointment
   */
  static async delete(id: string): Promise<boolean> {
    return await AppointmentRepository.delete(id);
  }

  /**
   * Get appointments for a specific date
   */
  static async getByDate(userId: string, date: string): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    return all.filter((apt) => apt.date.startsWith(date));
  }

  /**
   * Get appointments for a specific doctor
   */
  static async getByDoctor(
    userId: string,
    doctorName: string
  ): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    return all.filter((apt) =>
      apt.doctorName?.toLowerCase().includes(doctorName.toLowerCase())
    );
  }

  /**
   * Get today's appointments
   */
  static async getToday(userId: string): Promise<Appointment[]> {
    const today = new Date().toISOString().split("T")[0];
    return await this.getByDate(userId, today);
  }
}
