import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  execute({ provider, date }: Request): Appointment {
    const formatedDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      formatedDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: formatedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
