import React from 'react';

import { useState } from 'react';
import { postAppointment } from '../services/AppointmentService';
import { PostAppointmentSchema } from '../schemas/Appointment';

import LookUpOption from '../schemas/LookUpOption';
import LookUpTextField from './LookUpTextField';

import { getClients } from '../services/ClientService';
import { getResultCentersOfUser } from '../services/ResultCenterService';
import { UserSchema } from '../schemas/User';

interface AppointmentFormProps {
    userLoggedIn: UserSchema
    successCallback: () => void;
    errorCallback: () => void;
}

export default function AppointmentForm ({ userLoggedIn, successCallback, errorCallback }: AppointmentFormProps) {
    const [postAppointmentType, setPostAppointmentType] = useState<string>('');
    const [postAppointmentStartDate, setPostAppointmentStartDate] = useState<string>('');
    const [postAppointmentEndDate, setPostAppointmentEndDate] = useState<string>('');
    const [postAppointmentProject, setPostAppointmentProject] = useState<string>('');
    const [postAppointmentJustification, setPostAppointmentJustification] = useState<string>('');

    const [postAppointmentClient, setPostAppointmentClient] = useState<LookUpOption | undefined>();
    const [availableClients, setAvailableClients] = useState<LookUpOption[]>([]);

    const [postAppointmentResultCenter, setPostAppointmentResultCenter] = useState<LookUpOption | undefined>();
    const [availableResultCenters, setAvailableResultCenters] = useState<LookUpOption[]>([]);

    useState(() => {
        getClients().then( clientsResponse => setAvailableClients(clientsResponse.map(client => ({ id: client.id, name: client.name, }))));
        getResultCentersOfUser().then( resultCentersResponse => setAvailableResultCenters(resultCentersResponse.map(resultCenter => ({ id: resultCenter.id, name: resultCenter.name, }))));
    })

    function handleTypeChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentType(event.target.value); }
    function handleStartDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentStartDate(event.target.value); }
    function handleEndDateChange(event: React.ChangeEvent<HTMLInputElement>){ setPostAppointmentEndDate(event.target.value); }
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

      // const id_user = getUsersId(postAppointmentUser)
      const formattedStartDate = formatDateTime(postAppointmentStartDate);
      const formattedEndDate = formatDateTime(postAppointmentEndDate);

      postAppointment({
        user: {
          id: userLoggedIn.id
        },
        appointmentType: postAppointmentType,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        resultCenter: {
            id: postAppointmentResultCenter,
        },
        client: {
            id: postAppointmentClient.id,
        },
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

          {availableClients && (
              <LookUpTextField
                  placeholder="Cliente"
                  options={availableClients}
                  onSelect={(option: LookUpOption) => setPostAppointmentClient(option) }
              />
          )}

          {availableResultCenters && (
              <LookUpTextField
                  placeholder="Centro de Resultado"
                  options={availableResultCenters}
                  onSelect={(option: LookUpOption) => setPostAppointmentResultCenter(option) }
              />
          )}

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
