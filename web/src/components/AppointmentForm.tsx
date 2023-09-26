import React from 'react';

import { useState } from 'react';
import { postAppointment } from '../services/AppointmentService';
import { PostAppointmentSchema } from '../schemas/Appointment';

import LookUpOption from '../schemas/LookUpOption';
import LookUpTextField from './LookUpTextField';

import { getClients } from '../services/ClientService';
// import getResultCentersOfUser from '../services/ResultCenterService';

interface AppointmentFormProps {
    successCallback: () => void;
    errorCallback: () => void;
}

export default function AppointmentForm ({ successCallback, errorCallback }: AppointmentFormProps) {
    const [postAppointmentType, setPostAppointmentType] = useState<string>('');
    const [postAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentResultCenter, setPostAppointmentResultCenter] = useState<string>('');
    // const [postAppointmentClient, setPostAppointmentClient] = useState<string>('');
    const [postAppointmentProject, setPostAppointmentProject] = useState<string>('');
    const [postAppointmentJustification, setPostAppointmentJustification] = useState<string>('');

    const [postAppointmentClient, setPostAppointmentClient] = useState<LookUpOption | undefined>();
    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);

    useState(() => {
        getClients().then(
            clientsResponse => setAvailableClients(clientsResponse.map(client => ({
                id: client.id,
                name: client.name,
            })))
        );
    })

    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentType(event.target.value); }
    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentEndDate(event.target.value); }
    function handleResultCenterChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentResultCenter(event.target.value); }
    // function handleClientChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentClient(event.target.value); }
    function handleProjectChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentProject(event.target.value); }
    function handleJustificationChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentJustification(event.target.value); }

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
      if (!postAppointmentType
        || !postAppointmentStartDate
        || !postAppointmentEndDate
        || !postAppointmentResultCenter
        || !postAppointmentClient
        || !postAppointmentProject
        || !postAppointmentJustification
      ) return errorCallback();

      event.preventDefault();
      postAppointment({
        requester: 1,
        type: postAppointmentType,
        startDate: postAppointmentStartDate,
        endDate: postAppointmentEndDate,
        resultCenter: { id: 1 },
        client: postAppointmentClient.id,
        project: postAppointmentProject,
        justification: postAppointmentJustification,
      } as PostAppointmentSchema)
      .then(() => successCallback());
    }

    return (
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Tipo" onChange={handleTypeChange}/>
          <input type="text" placeholder="Início" onChange={handleStartDateChange}/>
          <input type="text" placeholder="Fim" onChange={handleEndDateChange}/>
          <input type="text" placeholder="CR" onChange={handleResultCenterChange}/>

          {availableClients && (
              <LookUpTextField
                  placeholder="Cliente"
                  options={availableClients}
                  onSelect={(option: LookUpOption) => setPostAppointmentClient(option) }
              />
          )}

          <input type="text" placeholder="Projeto" onChange={handleProjectChange}/>
          <input type="text" placeholder="Justificativa" onChange={handleJustificationChange}/>
          <button type="submit">Cadastrar</button>
      </form>
    );
}
