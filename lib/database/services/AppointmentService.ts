import { Appointment } from "../../../types";
import { AppointmentRepository } from "../repositories";

export class AppointmentService {
  static async create(
    userId: string,
    data: Omit<Appointment, "id" | "createdAt" | "updatedAt">,
  ): Promise<Appointment> {
    return await AppointmentRepository.create(userId, data);
  }

  static async getAll(userId: string): Promise<Appointment[]> {
    return await AppointmentRepository.getByUserId(userId);
  }

  static async getUpcoming(userId: string): Promise<Appointment[]> {
    return await AppointmentRepository.getUpcoming(userId);
  }

  static async getPast(userId: string): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    const now = new Date().toISOString();
    return all.filter((apt) => apt.date < now);
  }

  static async getById(id: string): Promise<Appointment | null> {
    return await AppointmentRepository.getById(id);
  }

  static async update(
    id: string,
    data: Partial<Omit<Appointment, "id" | "userId" | "createdAt">>,
  ): Promise<Appointment> {
    return await AppointmentRepository.update(id, data);
  }

  static async delete(id: string): Promise<boolean> {
    return await AppointmentRepository.delete(id);
  }

  static async getByDate(userId: string, date: string): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    return all.filter((apt) => apt.date.startsWith(date));
  }

  static async getByDoctor(
    userId: string,
    doctorName: string,
  ): Promise<Appointment[]> {
    const all = await AppointmentRepository.getByUserId(userId);
    return all.filter((apt) =>
      apt.doctorName?.toLowerCase().includes(doctorName.toLowerCase()),
    );
  }

  static async getToday(userId: string): Promise<Appointment[]> {
    const today = new Date().toISOString().split("T")[0];
    return await this.getByDate(userId, today);
  }
}
