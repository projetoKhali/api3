import { useState } from 'react';
import { postAppointment } from '../services/AppointmentService';
import { PostAppointment } from '../schemas/Appointment';

export default function AppointmentForm ({ callback }: { callback: () => void }) {
    const [postAppointmentRequester, setPostAppointmentRequester] = useState<string>('');
    const [postAppointmentType, setPostAppointmentType] = useState<string>('');
    const [postAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentResultCenter, setPostAppointmentResultCenter] = useState<string>('');
    const [postAppointmentClient, setPostAppointmentClient] = useState<string>('');
    const [postAppointmentProject, setPostAppointmentProject] = useState<string>('');
    const [postAppointmentJustification, setPostAppointmentJustification] = useState<string>('');
    const [postAppointmentStatus, setPostAppointmentStatus] = useState<string>('');

    function handleRequesterChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentRequester(event.target.value); }
    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentType(event.target.value); }
    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentEndDate(event.target.value); }
    function handleResultCenterChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentResultCenter(event.target.value); }
    function handleClientChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentClient(event.target.value); }
    function handleProjectChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentProject(event.target.value); }
    function handleJustificationChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentJustification(event.target.value); }
    function handleStatusChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStatus(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      if (!postAppointmentRequester
        || !postAppointmentType
        || !postAppointmentStartDate
        || !postAppointmentEndDate
        || !postAppointmentResultCenter
        || !postAppointmentClient
        || !postAppointmentProject
        || !postAppointmentJustification
        || !postAppointmentStatus
      ) return;
      event.preventDefault();
      postAppointment({
        requester: postAppointmentRequester,
        type: postAppointmentType,
        startDate: postAppointmentStartDate,
        endDate: postAppointmentEndDate,
        resultCenter: postAppointmentResultCenter,
        client: postAppointmentClient,
        project: postAppointmentProject,
        justification: postAppointmentJustification,
        status: postAppointmentStatus,
      } as PostAppointment)
      .then(() => callback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Solicitante" onChange={handleRequesterChange}/>
          <input type="text" placeholder="Tipo" onChange={handleTypeChange}/>
          <input type="text" placeholder="Início" onChange={handleStartDateChange}/>
          <input type="text" placeholder="Fim" onChange={handleEndDateChange}/>
          <input type="text" placeholder="CR" onChange={handleResultCenterChange}/>
          <input type="text" placeholder="Cliente" onChange={handleClientChange}/>
          <input type="text" placeholder="Projeto" onChange={handleProjectChange}/>
          <input type="text" placeholder="Justificativa" onChange={handleJustificationChange}/>
          <input type="text" placeholder="Status" onChange={handleStatusChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    );
}
