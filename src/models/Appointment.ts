import { uuid } from 'uuidv4';

interface IAppointment {
  provider: string;
  date: Date;
}

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: IAppointment) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
