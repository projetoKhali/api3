import { useState } from 'react';
import { PostAppointment } from '../schemas/Appointment';
import { postAppointment } from '../services/AppointmentService';

interface AppointmentFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function AppointmentForm ({ successCallback, errorCallback }: AppointmentFormProps) {
    const [postAppointmentUser, setPostAppointmentUser] = useState<string>('');
    const [postAppointmentType, setPostAppointmentType] = useState<string>('');
    const [postAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentResultCenter, setPostAppointmentResultCenter] = useState<string>('');
    const [postAppointmentClient, setPostAppointmentClient] = useState<string>('');
    const [postAppointmentProject, setPostAppointmentProject] = useState<string>('');
    const [postAppointmentJustification, setPostAppointmentJustification] = useState<string>('');

    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentType(event.target.value); }
    function handleUserChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentUser(event.target.value); }
    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentEndDate(event.target.value); }
    function handleResultCenterChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentResultCenter(event.target.value); }
    function handleClientChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentClient(event.target.value); }
    function handleProjectChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentProject(event.target.value); }
    function handleJustificationChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentJustification(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      if (!postAppointmentType
        || !postAppointmentStartDate
        || !postAppointmentUser
        || !postAppointmentEndDate
        || !postAppointmentResultCenter
        || !postAppointmentClient
        || !postAppointmentProject
        || !postAppointmentJustification
      ) return errorCallback();

      event.preventDefault();
      
      // const id_user = getUsersId(postAppointmentUser)
      const formattedStartDate = formatDateTime(postAppointmentStartDate);
      const formattedEndDate = formatDateTime(postAppointmentEndDate);

      postAppointment({
        user: {
          id: postAppointmentUser
        },
        appointmentType: postAppointmentType,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        resultCenter: { id: postAppointmentResultCenter},
        client: { id: postAppointmentClient},
        project: postAppointmentProject,
        justification: postAppointmentJustification,
      } as PostAppointment )
      .then(() => successCallback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Tipo" onChange={handleTypeChange}/>
          <input type="text" placeholder="User" onChange={handleUserChange}/>
          <input type="text" placeholder="Início" onChange={handleStartDateChange}/>
          <input type="text" placeholder="Fim" onChange={handleEndDateChange}/>
          <input type="text" placeholder="CR" onChange={handleResultCenterChange}/>
          <input type="text" placeholder="Cliente" onChange={handleClientChange}/>
          <input type="text" placeholder="Projeto" onChange={handleProjectChange}/>
          <input type="text" placeholder="Justificativa" onChange={handleJustificationChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    );
}

function formatDateTime(dateTimeStr: string): string {
  const parts = dateTimeStr.split(' ');
  const dateParts = parts[0].split('/');
  const timeParts = parts[1].split(':');
  const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  const formattedTime = `${timeParts[0]}:${timeParts[1]}:00.000+00:00`;
  return `${formattedDate}T${formattedTime}`;
}
