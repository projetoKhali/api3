import { useState } from 'react';
import { getAppointments, postAppointment } from '../services/AppointmentService';
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

    function handleRequesterChange(event: any){ setPostAppointmentRequester(event.target.value); }
    function handleTypeChange(event: any){ setPostAppointmentType(event.target.value); }
    function handleStartDateChange(event: any){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: any){ setPostAppointmentEndDate(event.target.value); }
    function handleResultCenterChange(event: any){ setPostAppointmentResultCenter(event.target.value); }
    function handleClientChange(event: any){ setPostAppointmentClient(event.target.value); }
    function handleProjectChange(event: any){ setPostAppointmentProject(event.target.value); }
    function handleJustificationChange(event: any){ setPostAppointmentJustification(event.target.value); }
    function handleStatusChange(event: any){ setPostAppointmentStatus(event.target.value); }

    function handleSubmit(event: any) {
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
